// import interfaces
import { INavigationButtonMethod } from "Interfaces";
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
  title: "Navigation Button Method",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<INavigationButtonMethod> = (
  args: INavigationButtonMethod
) => <NavigationButton {...args} />;

export const Aggregates = Template.bind({});
Aggregates.args = {
  data: {
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

export const ActiveLearning = Template.bind({});
ActiveLearning.args = {
  data: {
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

export const KMeansClustering = Template.bind({});
KMeansClustering.args = {
  data: {
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
