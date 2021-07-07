// import components
import React, { useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

// get default supported upload types
import { SUPPORTED_UPLOAD_TYPES } from "utils/defaults";

// import request library
import axios from "axios";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the helper functions
//===============================================

// checks the validity of the file
function validator(file: File) {
  if (!SUPPORTED_UPLOAD_TYPES.includes(file.type)) {
    return {
      message: `File has invalid type: ${file.type}`,
      code: "file-invalid-type",
    };
  }
  return null;
}

//===============================================
// Define the page component
//===============================================

export default function Upload() {
  // set the dataset state container
  const [fileInfo, setFileInfo] = useState<any>();
  const [progress, setProgress] = useState(0);
  // set the dataset info
  const [dataset, setDataset] = useState<any>();
  const [metadata, setMetadata] = useState<any>();

  // uploads the file to infominer
  async function onDrop(files: File[]) {
    if (files.length === 1) {
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        const {
          data: { datasets, metadata },
        } = await axios.post("/api/v1/datasets", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: ({ loaded, total }) => {
            setProgress((loaded / total) * 100);
          },
        });
        setDataset(datasets);
        setMetadata(metadata);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // what happens when a file is rejected
  function onDropRejected(fileRejections: FileRejection[], _event: DropEvent) {
    // TODO: notify the user about the rejection
    console.log(fileRejections);
  }

  // initialize the dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    validator,
    onDrop,
    onDropRejected,
  });

  console.log(dataset);
  console.log(metadata);
  return (
    <div className={styles.container}>
      <div>
        <h1>Upload</h1>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div>Upload progress: {progress}%</div>
        {progress === 100 ? <div>processing file</div> : null}
      </div>
    </div>
  );
}
