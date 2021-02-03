// import interfaces
import { IDataset } from "Interfaces";
// import modules
import React, { useState } from "react";
import { formatNumber, formatDate } from "utils/format";
import EditButton from "components/EditButton";
import DeleteButton from "components/DeleteButton";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetInfo(props: IDataset) {
  // get dataset information and set their state
  const { nDocuments, created } = props;
  const [name] = useState(props.name);

  // format values
  const createdDate = formatDate(new Date(created));
  const numberDocs = formatNumber(nDocuments as number);

  return (
    <div className={styles.container}>
      <div className={styles.controllers}>
        <h1>{name}</h1>
        <div className={styles.buttons}>
          <EditButton dark={true} />
          <DeleteButton dark={true} />
        </div>
      </div>
      <div className={styles.information}>
        <div className={styles.metadata}>
          <div>
            <b>No. Documents:</b> {numberDocs}
          </div>
          <div>
            <b>Created Date:</b> {createdDate}
          </div>
        </div>
      </div>
    </div>
  );
}
