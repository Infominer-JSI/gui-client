// import interface definitions
import { IDatasets } from "Interfaces";

// import the modules
import React from "react";
import DatasetsTableRow from "components/Datasets/DatasetsTable/DatasetTableRow";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetsList(props: IDatasets) {
  // set the state
  const datasets = props.datasets;
  return (
    <div className={styles.list}>
      {datasets.map((dataset, id) => (
        <DatasetsTableRow key={id} {...dataset} />
      ))}
    </div>
  );
}
