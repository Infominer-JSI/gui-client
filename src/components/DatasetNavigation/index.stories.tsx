// import interfaces
import { INavigation } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Navigation from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Navigation,
  title: "Navigation",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<INavigation> = (args: INavigation) => (
  <Navigation {...args} />
);

export const Subset = Template.bind({});
Subset.args = {
  data: {
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

export const Method = Template.bind({});
Method.args = {
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
