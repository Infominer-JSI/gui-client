import { IDataset, ISubset, IMethod } from "Interfaces";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatasetInfo from "components/DatasetInfo";

import styles from "./styles.module.scss";

export default function Datasets() {
  // get URL parameters
  const params = useParams<{ datasetId: string }>();
  // set state variables
  const [datasetId] = useState(parseInt(params.datasetId));
  const [loading, setLoading] = useState(true);
  // dataset, subset and method information
  const [dataset, setDataset] = useState<IDataset>();
  const [subsets, setSubsets] = useState<ISubset[]>();
  const [methods, setMethods] = useState<IMethod[]>();

  if (!datasetId) {
  }

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
        <DatasetInfo {...(dataset as IDataset)} />
      )}
    </div>
  );
}
