import { IStoreContext } from "utils/GlobalState";

// ==============================================
// Global Store Definitions
// ==============================================

interface IDatasetField {
  name: string;
  type: string;
  group: string;
}

export interface IDatasets {
  datasets: IDataset[];
}

export interface IDataset {
  id: number;
  type: string;
  name: string;
  description: string | null;
  nDocuments: number | null;
  created: string;
  status?: string;
  fields?: IDatasetField[];
}

export interface ISubset {
  id: number;
  type: string;
  label: string;
  description: string | null;
  resultedIn: number | null;
  usedBy: number[];
  nDocuments: number;
  modified: boolean;
  metadata?: any;
}

export interface IMethod {
  id: number;
  type: string;
  method: string;
  status: string;
  appliedOn: number;
  produced: number[] | null;
  parameters: any;
  result: any;
  modified: boolean;
}

export interface IStore {
  datasets: IDataset;
  subsets: ISubset[];
  methods: IMethod[];
}

// ==============================================
// Global Component Definitions
// ==============================================

export interface IComponentSubset {
  store: IStoreContext;
  subsetId: number;
}

export interface IComponentMethod {
  store: IStoreContext;
  methodId: number;
}

// ==============================================
// Global Method Definitions
// ==============================================

export enum EMethodTypes {
  AGGREGATE = "aggregates.subset",
  ACTIVE_LEARNING = "classifier.active_learning",
  KMEANS_CLUSTERING = "clustering.kmeans",
}

// ==============================================
// Global Graph Definitions
// ==============================================

export interface IGraphData {
  value: string;
  frequency: number;
  precent: number;
}
