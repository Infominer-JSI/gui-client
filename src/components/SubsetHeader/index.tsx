// import interfaces
import { ISubset, ISubsetHeader } from "Interfaces";
// import modules
import React from "react";
import { formatNumber } from "utils/format";
import EditButton from "components/EditButton";
import DeleteButton from "components/DeleteButton";
import DownloadButton from "components/DownloadButton";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetInfo(props: ISubsetHeader) {
  // get dataset information and set their state
  const { selectedId, dataset } = props;
  // get dataset and subset metadata
  const { id: datasetId } = dataset.getDataset();
  const { id: subsetId, label, nDocuments } = dataset.getSubset(
    selectedId
  ) as ISubset;
  // format the number of documents
  const numberDocs = formatNumber(nDocuments as number);
  // create the download link and filename
  const downloadLink = `/api/v1/datasets/${datasetId}/subsets/${subsetId}/download`;
  const formatLabel = label.replace(/[, ]+/g, "-").toLowerCase();
  const filename = `${formatLabel}-D${datasetId}S${subsetId}T${Date.now()}.csv`;
  return (
    <div className={styles.container}>
      <div className={styles.controllers}>
        <h1>{label}</h1>
        <div className={styles.buttons}>
          <DownloadButton downloadLink={downloadLink} filename={filename} />
          <EditButton />
          {subsetId !== 0 ? <DeleteButton /> : null}
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
