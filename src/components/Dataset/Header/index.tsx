// import interfaces
import { IDataset } from "Interfaces";
// import modules
import React, { useState } from "react";
import { formatNumber, formatDate } from "utils/format";
import Button from "components/Inputs/Button";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetHeader(props: IDataset) {
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
          <Button
            type="full"
            size="medium"
            color="green"
            icon="edit"
            intensity="dark"
            onClick={() => {}}
          />
          <Button
            type="full"
            size="medium"
            color="red"
            icon="delete"
            intensity="dark"
            onClick={() => {}}
          />
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
