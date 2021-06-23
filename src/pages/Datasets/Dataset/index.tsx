// import modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import Navigation from "components/Dataset/Navigation";
import ActionSidebar from "components/ActionSidebar";
import Subset from "components/Subset";
import Footer from "components/Footer";

// import styles
import styles from "./styles.module.scss";

// import global state
import { useStore } from "utils/GlobalState";

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

  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value: boolean) => setToggled(value);

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
        <React.Fragment>
          <ActionSidebar
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
          />
          <div className={styles.body}>
            <Navigation
              store={store}
              selectedId={subsetId}
              handleToggleSidebar={handleToggleSidebar}
            />
            <div className={styles.content}>
              <div className={styles.layout}>
                <div className={styles.main}>
                  <Subset store={store} subsetId={subsetId} />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
