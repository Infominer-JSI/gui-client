// import interfaces
import { INavigationButton } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import NavigationButton from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: NavigationButton,
  title: "Dataset/Navigation/Button",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<INavigationButton> = (args: INavigationButton) => (
  <NavigationButton {...args} />
);

export const Subset = Template.bind({});
Subset.args = {
  selected: {
    id: 0,
    type: "subset",
    label: "root",
    description: "The subset containing all of the documents",
    nDocuments: 234,
    resultedIn: 0,
    usedBy: [1, 2],
    modified: false,
  },
};

export const SubsetLongName = Template.bind({});
SubsetLongName.args = {
  selected: {
    id: 0,
    type: "subset",
    label: "This subset has a long name",
    description: "The subset containing all of the documents",
    nDocuments: 234,
    resultedIn: 0,
    usedBy: [1, 2],
    modified: false,
  },
};

export const SubsetALotOfDocuments = Template.bind({});
SubsetALotOfDocuments.args = {
  selected: {
    id: 0,
    type: "subset",
    label: "This subset has a long name",
    description: "The subset containing all of the documents",
    nDocuments: 2340010,
    resultedIn: 0,
    usedBy: [1, 2],
    modified: false,
  },
};

export const MethodAggregates = Template.bind({});
MethodAggregates.args = {
  selected: {
    id: 0,
    type: "method",
    method: "aggregates.subset",
    appliedOn: 0,
    produced: [1, 2],
    status: "FINISHED",
    parameters: {},
    result: {},
    modified: false,
  },
};

export const MethodActiveLearning = Template.bind({});
MethodActiveLearning.args = {
  selected: {
    id: 0,
    type: "method",
    method: "classifier.active_learning",
    appliedOn: 0,
    produced: [1, 2],
    status: "FINISHED",
    parameters: {},
    result: {},
    modified: false,
  },
};

export const MethodKMeansClustering = Template.bind({});
MethodKMeansClustering.args = {
  selected: {
    id: 0,
    type: "method",
    method: "clustering.kmeans",
    appliedOn: 0,
    produced: [1, 2],
    status: "FINISHED",
    parameters: {},
    result: {},
    modified: false,
  },
};
