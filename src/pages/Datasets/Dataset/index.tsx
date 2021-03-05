// import interfaces
import { IDataset, ISubset, IMethod } from "Interfaces";
// import modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import DatasetHeader from "components/Dataset/Header";
import Navigation from "components/Dataset/Navigation";
import Subset from "components/Subset";

// import utils
import Dataset from "utils/Dataset";
// import styles
import styles from "./styles.module.scss";

export default function Datasets() {
  // get URL parameters
  const params = useParams<{ datasetId: string; subsetId: string }>();

  if (!params.datasetId || !params.subsetId) {
    // check if the values are valid
  }

  // set state variables
  const datasetId = parseInt(params.datasetId);
  const subsetId = parseInt(params.subsetId);

  const [loading, setLoading] = useState(true);
  // dataset, subset and method information
  const [dataset, setDataset] = useState<Dataset>();

  // get the data
  useEffect(() => {
    async function fetchData() {
      // start loading
      setLoading(true);
      // get the datasetsa
      const response = await fetch(`/api/v1/datasets/${datasetId}`);
      const data: {
        datasets: IDataset;
        subsets: ISubset[];
        methods: IMethod[];
      } = await response.json();
      // set the dataset metadata
      setDataset(new Dataset(data.datasets, data.subsets, data.methods));
      // end loading
      setLoading(false);
    }
    fetchData();
  }, [datasetId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <span>Loading dataset...</span>
      ) : (
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <Navigation selectedId={subsetId} dataset={dataset as Dataset} />
            <DatasetHeader {...(dataset?.getDataset() as IDataset)} />
          </div>
          <div className={styles.main}>
            <Subset subsetId={subsetId} dataset={dataset as Dataset} />
          </div>
        </div>
      )}
    </div>
  );
}
