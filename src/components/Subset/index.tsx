// import modules
import React from "react";

// import components
import SubsetHeader from "components/Subset/SubsetHeader";
import Method from "components/Method";

// import global state
import { getSubset } from "utils/GlobalState";

//===============================================
// Define the component interfaces
//===============================================

import { ISubset, IComponentSubset } from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function Subset(props: IComponentSubset) {
  const { store, subsetId } = props;

  // get the subset metadata
  const subset = getSubset(store, subsetId) as ISubset;

  return (
    <React.Fragment>
      <SubsetHeader store={store} subsetId={subsetId} />
      {subset.usedBy.map((methodId, idx) => (
        <Method key={idx} store={store} methodId={methodId} />
      ))}
    </React.Fragment>
  );
}
