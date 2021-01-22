// import interface definitions
import { IDatasetListItemParams } from "Interfaces";

// import the modules
import React, { useState } from "react";
import { formatNumber } from "utils/format";
import styles from "./styles.module.scss";

const DatasetListItem = (props: IDatasetListItemParams) => {
  // assign the state
  const [name] = useState(props.name);
  const [description] = useState(props.description);
  const [nDocs] = useState(props.nDocuments);
  const [status] = useState(props.status);

  // get the inital of the name
  const initial = name[0];
  // create the creation date
  const createdDate = new Date(props.created);
  const dateYear = createdDate.getFullYear();
  const dateMonth = `0${createdDate.getMonth() + 1}`.substring(0, 2);
  const dateDay = createdDate.getDate();
  const created = `${dateYear}-${dateMonth}-${dateDay}`;
  // dataset status
  const isError = status === "ERROR";
  const isFinished = status === "FINISHED";

  return (
    <div className={isError ? styles.itemError : styles.item}>
      <div className={styles.initial}>
        <span>{initial}</span>
      </div>
      <div className={styles.info}>
        <header className={styles.title}>{name}</header>
        <div className={styles.metadata}>
          {nDocs ? (
            <span className={styles.n_docs}>
              {formatNumber(nDocs)} documents
            </span>
          ) : null}
          <span className={styles.creation_time}>Creation Date: {created}</span>
        </div>
      </div>
    </div>
  );
};

export default DatasetListItem;
