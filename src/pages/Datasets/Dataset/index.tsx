import { IDataset, ISubset, IMethod } from "Interfaces";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import components
import DatasetMetadata from "components/DatasetMetadata";
import SubsetMetadata from "components/SubsetMetadata";
import ResponseGrid from "components/ResponseGrid";

import styles from "./styles.module.scss";

export default function Datasets() {
  // get URL parameters
  const params = useParams<{ datasetId: string; subsetId: string }>();

  if (!params.datasetId || !params.subsetId) {
    // check if the values are valid
  }

  // set state variables
  const [datasetId] = useState(parseInt(params.datasetId));
  const [subsetId] = useState(parseInt(params.subsetId));

  const [loading, setLoading] = useState(true);
  // dataset, subset and method information
  const [dataset, setDataset] = useState<IDataset>();
  const [subsets, setSubsets] = useState<ISubset[]>([]);
  const [methods, setMethods] = useState<IMethod[]>([]);

  // get the data
  useEffect(() => {
    async function fetchData() {
      // get the datasetsa
      const response = await fetch(`/api/v1/datasets/${datasetId}`);
      const data: {
        datasets: IDataset;
        subsets: ISubset[];
        methods: IMethod[];
      } = await response.json();
      // set the
      setDataset(data.datasets);
      setSubsets(data.subsets);
      setMethods(data.methods);
      setLoading(false);
    }
    fetchData();
  }, [datasetId]);

  console.log(dataset);
  console.log(subsets);
  console.log(methods);

  return (
    <div className={styles.container}>
      {loading ? (
        <span>Loading dataset...</span>
      ) : (
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <DatasetMetadata {...(dataset as IDataset)} />
          </div>
          <div className={styles.main}>
            <SubsetMetadata {...(subsets[subsetId] as ISubset)} />
            <ResponseGrid>
              <div
                key="1"
                data-grid={{ x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
              ></div>
              <div
                key="2"
                data-grid={{ x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
              ></div>
              <div
                key="3"
                data-grid={{ x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
              ></div>
              <div
                key="4"
                data-grid={{ x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
              ></div>
              <div
                key="5"
                data-grid={{ x: 0, y: 2, w: 3, h: 2, minW: 2, minH: 2 }}
              ></div>
              <div
                key="6"
                data-grid={{ x: 6, y: 2, w: 3, h: 2, minW: 2, minH: 2 }}
              ></div>
            </ResponseGrid>
          </div>
        </div>
      )}
    </div>
  );
}
