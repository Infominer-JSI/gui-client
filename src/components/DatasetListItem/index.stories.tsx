// src/components/Task.stories.js

import { IDatasetListItemParams } from "Interfaces";

import React from "react";
import { Story } from "@storybook/react/types-6-0";

import DatasetListItem from "./index";

const storyComponent = {
  component: DatasetListItem,
  title: "Dataset List Item",
};

export default storyComponent;

const Template: Story<IDatasetListItemParams> = (
  args: IDatasetListItemParams
) => <DatasetListItem {...args} />;

export const InQueue = Template.bind({});
InQueue.args = {
  id: 1,
  type: "dataset",
  name: "The Secret Dataset",
  description: null,
  nDocuments: null,
  created: "2021-01-19T12:31:00.071Z",
  status: "IN_QUEUE",
};

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
