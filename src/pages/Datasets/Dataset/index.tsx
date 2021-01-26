import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Datasets() {
  // get URL parameters
  const params = useParams<{ datasetId: string }>();
  // set state variables
  const [datasetId] = useState(parseInt(params.datasetId));

  if (!datasetId) {
  }

  return (
    <div>
      <h1>Dataset: {datasetId}</h1>
    </div>
  );
}
