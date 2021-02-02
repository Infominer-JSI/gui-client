// import interfaces
import { IDatasets } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import DatasetList from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DatasetList,
  title: "Datasets/Dataset List",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IDatasets> = (args: IDatasets) => (
  <DatasetList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  datasets: [
    {
      id: 1,
      type: "dataset",
      name: "The Secret-Secret Dataset",
      description: null,
      nDocuments: null,
      created: "2021-01-19T12:31:00.071Z",
      status: "LOADING",
    },
    {
      id: 2,
      type: "dataset",
      name: "The Secret Dataset",
      description: "The dataset consisting of the secret documents.",
      nDocuments: 42000,
      created: "2021-01-19T12:31:00.071Z",
      status: "FINISHED",
    },
    {
      id: 3,
      type: "dataset",
      name: "The Decoy",
      description: null,
      nDocuments: null,
      created: "2021-01-19T12:31:00.071Z",
      status: "ERROR",
    },
  ],
};
