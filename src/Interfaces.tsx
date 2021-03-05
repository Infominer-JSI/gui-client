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
  hasToolbox?: boolean;
  className?: any;
  children: any[];
}

export interface IResponsiveGridItem {
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
  type: "full" | "outline";
  icon?: "none" | "edit" | "delete" | "download";
  size: "small" | "medium" | "large";
  color: "blue" | "green" | "yellow" | "red" | "gray";
  intensity: "light" | "dark";
  text?: string;
}

export interface IButtonNavigation {
  onClick?: any;
  selected: ISubset | IMethod;
}

export interface IDropdown {
  className?: any;
  selectedId: number;
  options: string[];
  onClick?: any;
}

export interface IDropdownList {
  hidden: boolean;
  selectedId: number;
  options: string[];
  toggle?: any;
  onClick?: any;
}

export interface IButtonNavigationSubset {
  className: any;
  onClick?: any;
  selected: ISubset;
}

export interface IButtonNavigationMethod {
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

export interface INavigationItemSubset {
  selectedId: number;
  dataset: Dataset;
  subsetId: number;
  onClick?: any;
}

export interface INavigationItemMethod {
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

export interface IHeaderSubset {
  subsetId: number;
  dataset: Dataset;
}

export interface IComponentSubset {
  subsetId: number;
  dataset: Dataset;
}

export interface IComponentMethod {
  methodId: number;
  dataset: Dataset;
}

export interface IModal {
  type: "delete" | "edit";
}

// ==============================================
// Aggregates
// ==============================================

export interface IAggregateComponent {
  field: string;
  type: string;
  statistics: { [key: string]: any };
  onDeleteItem?: any;
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
  data: {
    name: string;
    frequency: number;
    precent: number;
    children: IHierarchy[];
  };
  keys?: string[];
  className?: any;
}

export interface IGraphData {
  value: string;
  frequency: number;
  precent: number;
}

export interface IGraphBarchart {
  data: IGraphData[];
  className?: any;
  color?: string;
}

export interface IGraphPiechart {
  data: IGraphData[];
  keys?: string[];
  className?: any;
}

export interface IKeyword {
  keyword: string;
  weight: number;
}

export interface IGraphWordcloud {
  data: IKeyword[];
  className?: any;
}

export interface IHistogramData {
  min: number;
  max: number;
  frequency: number;
  precent: number;
  percentSum: number;
}

export interface IHistogram {
  count: number;
  min: number;
  max: number;
  mean: number;
  stdev: number;
  median: number;
  sum: number;
  values: IHistogramData[];
}

export interface IGraphHistogram {
  data: IHistogram;
  className?: any;
  color?: string;
}
