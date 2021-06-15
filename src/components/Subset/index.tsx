// import modules
import React from "react";

// import components
import SubsetHeader from "components/Subset/Header";
import Method from "components/Method";

// import global state
import { useStore, getSubset } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import { ISubset, IComponentSubset } from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function Subset(props: IComponentSubset) {
  const { subsetId } = props;

  // get the gobal store
  const { store } = useStore();

  // get the subset metadata
  const subset = getSubset(store, subsetId) as ISubset;

  return (
    <React.Fragment>
      <SubsetHeader subsetId={subsetId} />
      {subset.usedBy.map((methodId, idx) => (
        <Method key={idx} methodId={methodId} />
      ))}
    </React.Fragment>
  );
}
