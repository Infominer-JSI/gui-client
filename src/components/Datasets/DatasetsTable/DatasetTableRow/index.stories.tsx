// import interfaces
import { IDataset } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import DatasetsTableRow from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DatasetsTableRow,
  title: "Datasets/Dataset Table/Row",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IDataset> = (args: IDataset) => (
  <DatasetsTableRow {...args} />
);

export const Loading = Template.bind({});
Loading.args = {
  id: 1,
  type: "dataset",
  name: "The Secret Dataset",
  description: null,
  nDocuments: null,
  created: "2021-01-19T12:31:00.071Z",
  status: "LOADING",
};

export const Finished = Template.bind({});
Finished.args = {
  id: 1,
  type: "dataset",
  name: "The Secret Dataset",
  description: "The dataset consisting of the secret documents.",
  nDocuments: 42000,
  created: "2021-01-19T12:31:00.071Z",
  status: "FINISHED",
};

export const Errored = Template.bind({});
Errored.args = {
  id: 1,
  type: "dataset",
  name: "The Secret Dataset",
  description: null,
  nDocuments: null,
  created: "2021-01-19T12:31:00.071Z",
  status: "ERROR",
};
