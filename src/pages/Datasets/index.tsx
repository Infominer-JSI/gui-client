// import interfaces
import { IDatasets } from "Interfaces";
// import modules
import React, { useState, useEffect } from "react";
// import components
import DatasetsTable from "components/Datasets/DatasetsTable";

import styles from "./styles.module.scss";

export default function Datasets() {
  const [datasets, setDatasets] = useState<IDatasets>({ datasets: [] });

  useEffect(() => {
    async function fetchData() {
      // get the datasetsa
      const response = await fetch("/api/v1/datasets");
      const data: IDatasets = await response.json();
      setDatasets(data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Datasets</h1>
      <DatasetsTable {...datasets} />
    </div>
  );
}
