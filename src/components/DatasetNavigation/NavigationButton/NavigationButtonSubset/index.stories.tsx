// import interfaces
import { INavigationButtonSubset } from "Interfaces";
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
  title: "Navigation Button Subset",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<INavigationButtonSubset> = (
  args: INavigationButtonSubset
) => <NavigationButton {...args} />;

export const Default = Template.bind({});
Default.args = {
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

export const LongName = Template.bind({});
LongName.args = {
  data: {
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

export const ALotOfDocuments = Template.bind({});
ALotOfDocuments.args = {
  data: {
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
