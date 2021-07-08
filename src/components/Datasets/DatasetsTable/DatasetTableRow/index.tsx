// import interface definitions
import { IDataset } from "Interfaces";

// import the modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatNumber, formatDate } from "utils/format";
import { sleep } from "utils/utils";

import axios from "axios";

// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSyncAlt,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

export default function DatasetsTableRow(props: IDataset) {
  // assign the states
  const [id] = useState(props.id);
  const [name] = useState(props.name);
  const [nDocuments, setDocs] = useState(props.nDocuments);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    async function checkDataset(): Promise<void> {
      // get the dataset status
      const { data: dataset } = await axios(`/api/v1/datasets/${id}/status`);
      if (dataset.status === "LOADING") {
        // the dataset is still loading
        // wait for 5 seconds and then check again
        await sleep(5000);
        await checkDataset();
      } else {
        // the dataset is prepared
        // set the documents and status
        setDocs(dataset.nDocuments);
        setStatus(dataset.status);
      }
    }
    if (status === "LOADING") {
      // check with the dataset status
      checkDataset();
    }
  }, [id, status]);

  // create the creation date
  const date = formatDate(new Date(props.created));

  /**
   * Set the status image.
   * @param status - The status string.
   */
  function statusSymbol(status: string) {
    switch (status) {
      case "ERROR":
        return <FontAwesomeIcon icon={faTimes} />;
      case "LOADING":
        return <FontAwesomeIcon spin icon={faSyncAlt} />;
      case "FINISHED":
        return <FontAwesomeIcon icon={faDatabase} />;
    }
  }

  // define the status schema
  const datasetStatus =
    status === "ERROR" ? styles.statusError : styles.statusDefault;

  // define where to go when the item is clicked
  const routePath =
    status === "FINISHED" ? `/datasets/${props.id}/subsets/0` : "/datasets";

  return (
    <Link to={routePath} className={styles.item}>
      <div className={datasetStatus}>
        <span>{statusSymbol(status as string)}</span>
      </div>
      <div className={styles.metadata}>
        <div>
          <header className={styles.title}>{name}</header>
          <div className={styles.info}>
            <span>Creation Date: {date}</span>
          </div>
        </div>
        <div>
          <div className={styles.info}>
            {nDocuments ? (
              <div>{formatNumber(nDocuments)} documents</div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
