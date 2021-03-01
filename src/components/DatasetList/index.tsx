// import interface definitions
import { IDatasets } from "Interfaces";

// import the modules
import React from "react";
import DatasetListItem from "components/DatasetList/DatasetListItem";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetList(props: IDatasets) {
  // set the state
  const datasets = props.datasets;
  return (
    <div className={styles.list}>
      {datasets.map((dataset, id) => (
        <DatasetListItem key={id} {...dataset} />
      ))}
    </div>
  );
}
