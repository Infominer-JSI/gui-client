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
  resultedIn: number;
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
  produced?: number[];
  parameters: any;
  result: any;
  modified: boolean;
}

export enum EMethodTypes {
  AGGREGATES = "aggregates.subset",
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
  data: ISubset | IMethod;
}

export interface INavigationButtonSubset {
  onClick?: any;
  data: ISubset;
}

export interface INavigationButtonMethod {
  onClick?: any;
  data: IMethod;
}

export interface INavigationDropdown {
  hidden: boolean;
  onClick?: any;
  children?: any;
}

export interface INavigation {
  onClick?: any;
  data: ISubset | IMethod;
}
