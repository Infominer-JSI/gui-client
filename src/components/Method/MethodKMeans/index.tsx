// import interfaces
import { IMethod, IComponentMethod } from "Interfaces";
// import modules
import React from "react";

import MethodHeader from "components/Method/Header";
import ResponsiveGrid from "components/Layouts/ResponsiveGrid";
import KMeansStatistics from "./KMeansStatistics";

export default function MethodKMeans(props: IComponentMethod) {
  const { methodId, dataset } = props;
  // get the method parameters and use them to visualize the results
  const method1 = dataset.getMethod(methodId) as IMethod;
  const datasetId = dataset.getDataset().id;
  // create the grid layout key
  const gridLayoutKey = `D${datasetId}M${methodId}`;

  const subsetIds = [method1.result.empty, ...method1.result.clusters].map(
    (cls: any) => cls.subsetId
  );
  const aggregateIds = dataset.getSubsets(subsetIds).map((s) => s?.usedBy[0]);
  const methods = dataset.getMethods(aggregateIds as number[]) as IMethod[];
  const groups = groupAggregates(methods);

  // groups the aggreates for comparison
  function groupAggregates(methods: IMethod[]) {
    const groups: any[] = [];
    for (let i = 0; i < methods[0].result.aggregates.length; i++) {
      const { field, type } = methods[0].result.aggregates[i];
      const group: {
        field: string;
        type: string;
        clusters: any[];
        minW: number;
        minH: number;
      } = {
        field,
        type,
        clusters: [],
        minW: 3 * methods.length,
        minH: 3,
      };
      for (const method of methods) {
        const subset = dataset.getSubset(method.appliedOn);
        const statistics = method.result.aggregates[i].statistics;
        group.clusters.push({ subset, datasetId, statistics });
      }
      // push the group
      groups.push(group);
    }
    return groups;
  }

  //! TODO: add cluster view selections

  return (
    <React.Fragment>
      <MethodHeader methodId={methodId} dataset={dataset} />
      <ResponsiveGrid layoutKey={gridLayoutKey} hasToolbox={true}>
        {groups.map((group: any, id: number) => (
          <KMeansStatistics key={id} {...group} />
        ))}
      </ResponsiveGrid>
    </React.Fragment>
  );
}
