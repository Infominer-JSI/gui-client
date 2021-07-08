// import modules
import React from "react";

// import components
import DatasetNavigationBreadcrumbs from "../DatasetNavigationBreadcrumb";

// import styles and images
import styles from "./styles.module.scss";

// import global state
import { getSubset, IStoreContext } from "utils/GlobalState";

//===============================================
// Define the component interfaces
//===============================================

// import interfaces
import { ISubset } from "Interfaces";

interface INavigationMetadata {
  store: IStoreContext;
  subsetId: number;
}

//===============================================
// Define the component
//===============================================

export default function Metadata(props: INavigationMetadata) {
  // get dataset information and set their state
  const { store, subsetId } = props;

  // get dataset and subset metadata
  const { label } = getSubset(store, subsetId) as ISubset;

  return (
    <div className={styles.metadata}>
      <div className={styles.information}>
        <h1>{label}</h1>

        <span className={styles["generated-from"]}>
          Generated from:{" "}
          {subsetId !== 0 ? (
            <DatasetNavigationBreadcrumbs store={store} selectedId={subsetId} />
          ) : (
            "None"
          )}
        </span>
      </div>
    </div>
  );
}
