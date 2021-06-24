// import components
import MethodAggregates from "components/Method/MethodAggregates";
import MethodKMeans from "components/Method/MethodKMeans";

// import global state
import { getMethod } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import { IMethod, IComponentMethod, EMethodTypes } from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function Method(props: IComponentMethod) {
  const { store, methodId } = props;

  // get the method parameters and use them to visualize the results
  const { method } = getMethod(store, methodId) as IMethod;

  let Component: any = null;
  switch (method) {
    case EMethodTypes.AGGREGATE:
      Component = MethodAggregates;
      break;
    case EMethodTypes.KMEANS_CLUSTERING:
      Component = MethodKMeans;
      break;
    default:
      break;
  }

  return Component ? <Component store={store} methodId={methodId} /> : null;
}
