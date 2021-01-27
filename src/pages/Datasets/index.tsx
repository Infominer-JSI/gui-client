// import interfaces
import { IDatasets } from "Interfaces";
// import modules
import React, { useState, useEffect } from "react";
// import components
import DatasetList from "components/DatasetList";

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
    <div>
      <h1>Datasets</h1>
      <DatasetList {...datasets} />
    </div>
  );
}
