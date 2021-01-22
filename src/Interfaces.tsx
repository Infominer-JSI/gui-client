export interface IDatasetListItemParams {
  id: number;
  type: string;
  name: string;
  description: string | null;
  nDocuments: number | null;
  created: string;
  status: string;
}
