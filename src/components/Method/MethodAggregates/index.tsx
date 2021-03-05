// import interfaces
import { IGraphData, IHierarchy, IMethod, IComponentMethod } from "Interfaces";
// import modules
import React from "react";
import ResponsiveGrid from "components/Layouts/ResponsiveGrid";
import AggregateComponent from "./AggregateComponent";

export default function MethodAggregates(props: IComponentMethod) {
  const { methodId, dataset } = props;
  // get the method parameters and use them to visualize the results
  const method1 = dataset.getMethod(methodId) as IMethod;
  const datasetId = dataset.getDataset().id;

  // normalize the other methods based on the first aggregate values
  const method0 = dataset.getMethod(0) as IMethod;
  // add additional information to the aggregate values
  for (let i = 0; i < method1.result.aggregates.length; i++) {
    const type = method1.result.aggregates[i].type;
    let statistics0: any;
    let keys: string[];
    switch (type) {
      case "hierarchy":
        // add all of the branch names to the submethod
        statistics0 = method0.result.aggregates[i].statistics;
        keys = statistics0.values.children.map((c: IHierarchy) => c.name);
        method1.result.aggregates[i].statistics.keys = keys;
        break;
      case "count":
        // add all of the possible values to the submethod
        statistics0 = method0.result.aggregates[i].statistics;
        keys = statistics0.values
          .map((c: IGraphData) => c.value)
          .concat("other");
        method1.result.aggregates[i].statistics.keys = keys;
        break;
      default:
        break;
    }
  }

  // create the grid layout key
  const gridLayoutKey = `D${datasetId}/AGGREGATES`;

  return (
    <ResponsiveGrid layoutKey={gridLayoutKey} hasToolbox={true}>
      {method1.result.aggregates.map((aggregate: any, id: number) => (
        <AggregateComponent key={id} {...aggregate} />
      ))}
    </ResponsiveGrid>
  );
}
