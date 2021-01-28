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
  metadata: any;
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

export interface IButton {
  width?: string | number;
  height?: string | number;
  onClick?: any;
  children?: any;
  type?: string;
}

export interface ICollapse {
  collapsed?: boolean;
  maxHeight?: number;
  children: any;
}
