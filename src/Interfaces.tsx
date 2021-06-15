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

export interface IComponentSubset {
  subsetId: number;
}

export interface IComponentMethod {
  methodId: number;
}

export interface IModal {
  isOpen: boolean;
  type: "delete" | "edit" | "exec";
  backClick: any;
  execClick: any;
  children?: React.ReactNode;
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
  newWgt?: number;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
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
