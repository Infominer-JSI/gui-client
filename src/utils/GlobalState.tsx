// import modules
import React, { useReducer, useContext, createContext } from "react";

//===============================================
// Define the state interfaces
//===============================================

import { IDataset, ISubset, IMethod } from "Interfaces";

interface IStoreContext {
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
  switch (action.type) {
    //! TODO: INIT_DATASET
    case "INIT":
      return { ...action.payload };
    //! TODO: UPDATE_DATASET

    //! TODO: ADD_SUBSET

    //! TODO: UPDATE_SUBSET

    //! TODO: REMOVE_SUBSET
    case "REMOVE_SUBSET":
      const removeId = action.payload;
      return {
        ...state,
        subsets: state.subsets.filter((s) => s.id !== removeId),
      };
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
