// import interfaces
import { ISubset, ISubsetHeader } from "Interfaces";
// import modules
import React from "react";
import { formatNumber } from "utils/format";
import { download } from "utils/utils";

// import components
import EditButton from "components/EditButton";
import DeleteButton from "components/DeleteButton";
import DownloadButton from "components/DownloadButton";

// import styles and images
import styles from "./styles.module.scss";

export default function SubsetHeader(props: ISubsetHeader) {
  // get dataset information and set their state
  const { subsetId, dataset } = props;
  // get dataset and subset metadata
  const { id: datasetId } = dataset.getDataset();
  const { label, nDocuments } = dataset.getSubset(subsetId) as ISubset;
  // format the number of documents
  const numberDocs = formatNumber(nDocuments as number);

  // create the download link and filename
  const downloadLink = `/api/v1/datasets/${datasetId}/subsets/${subsetId}/download`;
  const formatLabel = label.replace(/[, ]+/g, "-").toLowerCase();
  const filename = `${formatLabel}-D${datasetId}S${subsetId}T${Date.now()}.csv`;
  // set the download function
  const getFileFromURL = async () => {
    // download from the link and create a blob
    const response = await fetch(downloadLink);
    const blob = await response.blob();
    download(filename, blob);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controllers}>
        <h1>{label}</h1>
        <div className={styles.buttons}>
          <DownloadButton onClick={getFileFromURL} dark={true} />
          <EditButton dark={true} />
          {subsetId !== 0 ? <DeleteButton dark={true} /> : null}
        </div>
      </div>
      <div className={styles.information}>
        <div className={styles.metadata}>
          <div>
            <b>No. Documents:</b> {numberDocs}
          </div>
        </div>
      </div>
    </div>
  );
}
