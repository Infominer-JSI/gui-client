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
  AGGREGATE = "aggregates.subset",
  ACTIVE_LEARNING = "classifier.active_learning",
  KMEANS_CLUSTERING = "clustering.kmeans",
}

export interface IResponsiveGrid {
  layoutKey?: string;
  className?: any;
  children?: any;
}

export interface IGridItem {
  onMouseDown?: any;
  onMouseUp?: any;
  onTouchEnd?: any;
  children?: any;
  className?: any;
  style?: any;
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

export interface IDownloadButton {
  downloadLink: string;
  filename?: string;
  dark?: boolean;
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
  dataset: Dataset;
  selectedId: number;
  onClick?: any;
}

export interface ISubsetNavigationItem {
  selectedId: number;
  dataset: Dataset;
  subsetId: number;
  onClick?: any;
}

export interface IMethodNavigationItem {
  selectedId: number;
  dataset: Dataset;
  methodId: number;
  onClick?: any;
}

export interface INavigation {
  selectedId: number;
  dataset: Dataset;
  onClick?: any;
}

export interface ISubsetHeader {
  subsetId: number;
  dataset: Dataset;
}

export interface ISubsetComponent {
  subsetId: number;
  dataset: Dataset;
}

export interface IMethodComponent {
  methodId: number;
  dataset: Dataset;
}

// ==============================================
// Aggregates
// ==============================================

export interface IAggregateComponent {
  field: string;
  type: string;
  statistics: { [key: string]: any };
  className?: any;
}

// ==============================================
// Graphs
// ==============================================

export interface IHierarchy {
  name: string;
  frequency: number;
  precent: number;
  children?: IHierarchy[];
}

export interface IGraphSunburst {
  data: IHierarchy;
  className?: any;
}
