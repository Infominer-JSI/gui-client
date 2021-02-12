// import interfaces
import { IMethod, IMethodComponent } from "Interfaces";
// import modules
import React from "react";
import ResponsiveGrid from "components/ResponsiveGrid";
import AggregateComponent from "./AggregateComponent";

export default function MethodAggregates(props: IMethodComponent) {
  const { methodId, dataset } = props;
  // get the method parameters and use them to visualize the results
  const method = dataset.getMethod(methodId) as IMethod;
  const datasetId = dataset.getDataset().id;
  // create the grid layout key
  const gridLayoutKey = `D${datasetId}/Aggregates`;

  return (
    <ResponsiveGrid layoutKey={gridLayoutKey}>
      {method.result.aggregates.map((aggregate: any, id: number) => (
        <AggregateComponent key={id} {...aggregate} />
      ))}
    </ResponsiveGrid>
  );
}
