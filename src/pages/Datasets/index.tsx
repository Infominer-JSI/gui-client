// import interfaces
import { IDatasets } from "Interfaces";
// import modules
import React, { useState, useEffect } from "react";

import axios from "axios";

// import components
import DatasetsTable from "components/Datasets/DatasetsTable";

import styles from "./styles.module.scss";

export default function Datasets() {
  const [datasets, setDatasets] = useState<IDatasets>({ datasets: [] });

  useEffect(() => {
    async function fetchData() {
      // get the datasets
      const { data }: { data: IDatasets } = await axios("/api/v1/datasets");
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
