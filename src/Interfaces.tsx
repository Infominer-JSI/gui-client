export interface IDataset {
  id: number;
  type: string;
  name: string;
  description: string | null;
  nDocuments: number | null;
  created: string;
  status: string;
}

export interface IDatasets {
  datasets: IDataset[];
}
