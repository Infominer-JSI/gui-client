// import modules
import React, { useReducer, useContext, createContext } from "react";

//===============================================
// Define the state interfaces
//===============================================

import { IDataset, ISubset, IMethod } from "Interfaces";

export interface IStoreContext {
  datasets: IDataset | null;
  subsets: ISubset[];
  methods: IMethod[];
}

interface IStoreAction {
  type: string;
  payload: any;
}

interface IGlobalStore {
  store: IStoreContext;
  setStore: React.Dispatch<IStoreAction>;
}

//===============================================
// Initialize the store
//===============================================

// set initial state
const initialStore: IStoreContext = {
  datasets: null,
  subsets: [],
  methods: [],
};

// define the dataset reducer
const stateReducer = (state: IStoreContext, action: IStoreAction) => {
  console.log(action);
  let newState: IStoreContext;
  switch (action.type) {
    //! TODO: INIT_DATASET
    case "INIT":
      return { ...action.payload };
    //! TODO: UPDATE_DATASET

    //! TODO: ADD_SUBSET

    //! TODO: UPDATE_SUBSET
    case "UPDATE_SUBSET":
      newState = updateSubset(state, action.payload.id, action.payload);
      console.log(newState);
      return newState;
    //! TODO: REMOVE_SUBSET
    case "REMOVE_SUBSET":
      newState = removeSubset(state, action.payload.id);
      console.log(newState);
      return newState;
    //! TODO: ADD_METHOD

    //! TODO: UPDATE_METHOD

    //! TODO: REMOVE_METHOD

    //! TODO: RESET
    case "RESET":
      return { ...initialStore };
    default:
      return { ...state };
  }
};

//===============================================
// Define the global state
//===============================================

// export the global store
export const GlobalStore = createContext<IGlobalStore>({
  store: initialStore,
  setStore: (store) => console.warn("no store provider"),
});

// export the global component
export const GlobalComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [store, setStore] = useReducer(stateReducer, initialStore);
  return (
    <GlobalStore.Provider value={{ store, setStore }}>
      {children}
    </GlobalStore.Provider>
  );
};

// export the store retrieval
export const useStore = () => useContext(GlobalStore);

//===============================================
// Define the helper functions
//===============================================

export function getDataset(store: IStoreContext) {
  return store.datasets;
}

export function getSubsets(store: IStoreContext, ids: number[]) {
  return store.subsets.filter((s) => ids.includes(s.id));
}

export function getSubset(store: IStoreContext, id: number) {
  const subsets = getSubsets(store, [id]);
  return subsets.length ? subsets[0] : null;
}

export function getMethods(store: IStoreContext, ids: number[]) {
  return store.methods.filter((m) => ids.includes(m.id));
}

export function getMethod(store: IStoreContext, id: number) {
  const methods = getMethods(store, [id]);
  return methods.length ? methods[0] : null;
}

function removeSubset(store: IStoreContext, id: number) {
  let currentState = { ...store };

  // get the subset that will be removed
  const subset = store.subsets.filter((s) => s.id === id)[0] as ISubset;

  // remove all methods that used the subset
  for (const usedId of subset.usedBy) {
    currentState = removeMethod(currentState, usedId);
  }

  // remove the ID from the method the subset resulted in
  const method = currentState.methods.filter(
    (s) => s.id === subset.resultedIn
  )[0] as IMethod;
  method.produced = (method.produced as number[]).filter((i) => i !== id);

  if (method.produced.length === 0) {
    // the method does not have any produced
    // subsets anymore remove it
    currentState = removeMethod(currentState, method.id);
  }

  return {
    ...currentState,
    subsets: currentState.subsets.filter((s) => s.id !== id),
    methods: [
      ...currentState.methods.filter((s) => s.id !== subset.resultedIn),
      ...(method.produced.length ? [method] : []),
    ],
  };
}

function removeMethod(store: IStoreContext, id: number) {
  let currentState = { ...store };
  // get the method that will be removed
  const method = currentState.methods.filter((s) => s.id === id)[0] as IMethod;

  // remove all subsets that were created by the method
  if (method.produced) {
    for (const producedId of method.produced) {
      currentState = removeSubset(store, producedId);
    }
  }

  // remove the ID from the subset the method was applied on
  const subset = currentState.subsets.filter(
    (s) => s.id === method.appliedOn
  )[0] as ISubset;
  subset.usedBy = subset.usedBy.filter((i) => i !== id);

  return {
    ...currentState,
    methods: currentState.methods.filter((s) => s.id !== id),
    subsets: [
      ...currentState.subsets.filter((s) => s.id !== method.appliedOn),
      subset,
    ],
  };
}

function updateSubset(store: IStoreContext, id: number, subset: ISubset) {
  // get the subset that will have the metadata updated
  return {
    ...store,
    subsets: [...store.subsets.filter((s) => s.id !== id), subset],
  };
}
