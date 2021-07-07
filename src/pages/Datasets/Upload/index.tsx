// import components
import React, { useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import ProgressBar from "components/ProgressBar";
import UploadForm from "./UploadForm";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

// get default supported upload types
import { SUPPORTED_UPLOAD_TYPES } from "utils/defaults";

// import request library
import axios from "axios";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

//
type fieldType = "number" | "datetime" | "category" | "class" | "text";
interface IFileDataset {
  id: number;
  filename: string;
  delimiter: string;
  fields: {
    name: string;
    type: fieldType;
    included: boolean;
  }[];
}
interface IFileMetadata {
  types: fieldType[];
  stopwords: {
    languages: {
      label: string;
      value: string;
    }[];
  };
}

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
  const [dataset, setDataset] = useState<IFileDataset | null>();
  const [metadata, setMetadata] = useState<IFileMetadata>();

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
      <div className={styles.content}>
        <h1 className={styles.header}>Upload</h1>
        {dataset && metadata ? (
          <UploadForm dataset={dataset} metadata={metadata} />
        ) : (
          <React.Fragment>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <p>
                Drag 'n' drop the dataset file here, or click to select file
              </p>
            </div>
            <ProgressBar progress={progress} />
            {progress === 100 && !dataset ? (
              <div className={styles.loading}>
                <FontAwesomeIcon icon={faSync} size="3x" spin />
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
