import Dataset from "utils/Dataset";

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

export enum EMethodTypes {
  AGGREGATE = "aggregate.subset",
  ACTIVE_LEARNING = "classifier.active_learning",
  KMEANS_CLUSTERING = "clustering.kmeans",
}

export interface ICollapse {
  title?: string;
  collapsed?: boolean;
  maxHeight?: number;
  children: any;
}

export interface IButton {
  className?: any;
  onClick?: any;
  children?: any;
  type?: string;
}
export interface INavigationButton {
  onClick?: any;
  selected: ISubset | IMethod;
}

export interface ISubsetNavigationButton {
  className: any;
  onClick?: any;
  selected: ISubset;
}

export interface IMethodNavigationButton {
  className: any;
  onClick?: any;
  selected: IMethod;
}

export interface INavigationDropdown {
  hidden: boolean;
  onClick?: any;
  dataset: Dataset;
  selectedId: number;
}

export interface ISubsetNavigationItem {
  selectedId: number;
  dataset: Dataset;
  subsetId: number;
}

export interface IMethodNavigationItem {
  selectedId: number;
  dataset: Dataset;
  methodId: number;
}

export interface INavigation {
  selectedId: number;
  dataset: Dataset;
  onClick?: any;
}
