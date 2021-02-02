// import interfaces
import { ISubset } from "Interfaces";
// import modules
import React, { useState } from "react";
import { formatNumber } from "utils/format";
import EditButton from "components/EditButton";
import DeleteButton from "components/DeleteButton";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetInfo(props: ISubset) {
  // get dataset information and set their state
  const { id, nDocuments } = props;
  const [label] = useState(props.label);

  // format values
  const numberDocs = formatNumber(nDocuments as number);

  return (
    <div className={styles.container}>
      <div className={styles.controllers}>
        <h1>{label}</h1>
        <div className={styles.buttons}>
          <EditButton />
          {id !== 0 ? <DeleteButton /> : null}
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
