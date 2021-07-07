// import modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import DatasetNavigation from "components/Dataset/DatasetNavigation";
import ActionSidebar from "components/ActionSidebar";
import Subset from "components/Subset";
import Footer from "components/Footer";

import axios from "axios";

// import styles
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

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
      // get the datasets
      const {
        data: { datasets, subsets, methods },
      }: {
        data: {
          datasets: IDataset;
          subsets: ISubset[];
          methods: IMethod[];
        };
      } = await axios(`/api/v1/datasets/${datasetId}`);
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
        <div className={styles.loading}>
          <FontAwesomeIcon icon={faSync} size="3x" spin />
        </div>
      ) : (
        <React.Fragment>
          <ActionSidebar
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
          />
          <div className={styles.body}>
            <div className={styles.content}>
              <DatasetNavigation
                store={store}
                selectedId={subsetId}
                handleToggleSidebar={handleToggleSidebar}
              />
              <div className={styles.layout}>
                <div className={styles.main}>
                  <Subset store={store} subsetId={subsetId} />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
