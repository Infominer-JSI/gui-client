// import modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import Navigation from "components/Dataset/Navigation";
import DatasetHeader from "components/Dataset/Header";
import Subset from "components/Subset";

// import styles
import styles from "./styles.module.scss";

// import global state
import { useStore, getDataset } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import { IDataset, ISubset, IMethod } from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function Datasets() {
  // get the gobal store
  const { store, setStore } = useStore();

  // get URL parameters
  const params = useParams<{ datasetId: string; subsetId: string }>();

  if (!params.datasetId || !params.subsetId) {
    // check if the values are valid
  }

  // set state variables
  const datasetId = parseInt(params.datasetId);
  const subsetId = parseInt(params.subsetId);
  const [loading, setLoading] = useState(true);

  // get the data
  useEffect(() => {
    async function fetchData() {
      // start loading
      setLoading(true);
      // get the datasetsa
      const response = await fetch(`/api/v1/datasets/${datasetId}`);
      const {
        datasets,
        subsets,
        methods,
      }: {
        datasets: IDataset;
        subsets: ISubset[];
        methods: IMethod[];
      } = await response.json();
      // set the store
      setStore({
        type: "INIT",
        payload: {
          datasets,
          subsets,
          methods,
        },
      });
      // end loading
      setLoading(false);
    }
    fetchData();
  }, [datasetId, setStore]);

  return (
    <div className={styles.container}>
      {loading ? (
        <span>Loading dataset...</span>
      ) : (
        <div>
          <Navigation selectedId={subsetId} />
          <div className={styles.content}>
            <div className={styles.layout}>
              <div className={styles.sidebar}>
                <DatasetHeader {...(getDataset(store) as IDataset)} />
              </div>
              <div className={styles.main}>
                <Subset subsetId={subsetId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
