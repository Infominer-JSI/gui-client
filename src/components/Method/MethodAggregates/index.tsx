// import modules
import ResponsiveGrid from "components/Layouts/ResponsiveGrid";
import AggregateComponent from "./AggregateComponent";

// import global state
import { useStore, getDataset, getMethod } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import {
  IGraphData,
  IHierarchy,
  IDataset,
  IMethod,
  IComponentMethod,
} from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function MethodAggregates(props: IComponentMethod) {
  const { methodId } = props;

  // get the gobal store
  const { store } = useStore();

  // get the method parameters and use them to visualize the results
  const method1 = getMethod(store, methodId) as IMethod;
  const datasetId = getDataset(store) as IDataset;

  // normalize the other methods based on the first aggregate values
  const method0 = getMethod(store, 0) as IMethod;
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
