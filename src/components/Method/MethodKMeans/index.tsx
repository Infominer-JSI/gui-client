// import interfaces
import { IMethod, IMethodComponent } from "Interfaces";
// import modules
import React from "react";

import MethodHeader from "components/Method/Header";
import ResponsiveGrid from "components/ResponsiveGrid";
import KMeansCluster from "./KMeansCluster";

export default function MethodKMeans(props: IMethodComponent) {
  const { methodId, dataset } = props;
  // get the method parameters and use them to visualize the results
  const method1 = dataset.getMethod(methodId) as IMethod;
  const datasetId = dataset.getDataset().id;
  // create the grid layout key
  const gridLayoutKey = `D${datasetId}M${methodId}`;

  return (
    <React.Fragment>
      <MethodHeader methodId={methodId} dataset={dataset} />
      <ResponsiveGrid layoutKey={gridLayoutKey} hasToolbox={true}>
        {method1.result.clusters.map((cluster: any, id: number) => (
          <KMeansCluster key={id} {...cluster} />
        ))}
      </ResponsiveGrid>
    </React.Fragment>
  );
}
