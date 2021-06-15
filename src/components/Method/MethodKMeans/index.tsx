// import modules
import React from "react";

// import components
import MethodHeader from "components/Method/Header";
import ResponsiveGrid from "components/Layouts/ResponsiveGrid";
import KMeansStatistics from "./KMeansStatistics";

// import global state
import {
  useStore,
  getDataset,
  getMethod,
  getMethods,
  getSubset,
  getSubsets,
} from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

// import interfaces
import { IDataset, IMethod, ISubset, IComponentMethod } from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function MethodKMeans(props: IComponentMethod) {
  const { methodId } = props;

  // get the gobal store
  const { store } = useStore();

  // get the method parameters and use them to visualize the results
  const method1 = getMethod(store, methodId) as IMethod;
  const { id: datasetId } = getDataset(store) as IDataset;
  // create the grid layout key
  const gridLayoutKey = `D${datasetId}M${methodId}`;

  const subsetIds = [method1.result.empty ?? null, ...method1.result.clusters]
    .filter((c) => c)
    .map((cls: any) => cls.subsetId);
  const aggregateIds = getSubsets(store, subsetIds).map(
    (s) => s?.usedBy[0]
  ) as number[];
  const methods = getMethods(store, aggregateIds) as IMethod[];
  const groups = groupAggregates(methods.filter((m) => m));

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
        const subset = getSubset(store, method.appliedOn) as ISubset;
        const statistics = method.result.aggregates[i].statistics;
        group.clusters.push({ subset, datasetId, statistics });
      }
      // push the group
      groups.push(group);
    }
    return groups;
  }

  //! TODO: add cluster view selections
  // which clusters to view

  return (
    <React.Fragment>
      <MethodHeader methodId={methodId} />
      <ResponsiveGrid layoutKey={gridLayoutKey} hasToolbox={true}>
        {groups.map((group: any, id: number) => (
          <KMeansStatistics key={id} {...group} />
        ))}
      </ResponsiveGrid>
    </React.Fragment>
  );
}
