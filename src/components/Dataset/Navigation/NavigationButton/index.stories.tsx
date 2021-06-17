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

type NavigationButtonProps = React.ComponentProps<typeof NavigationButton>;
const Template: Story<NavigationButtonProps> = (
  args: NavigationButtonProps
) => <NavigationButton {...args} />;

export const Button1 = Template.bind({});
Button1.args = {
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

export const Button2 = Template.bind({});
Button2.args = {
  selected: {
    id: 0,
    type: "subset",
    label: "Long Subset Name",
    description: null,
    nDocuments: 234,
    resultedIn: 0,
    usedBy: [1, 2],
    modified: false,
  },
};

export const Button3 = Template.bind({});
Button3.args = {
  selected: {
    id: 0,
    type: "subset",
    label: "Subset",
    description: null,
    nDocuments: 2340010,
    resultedIn: 0,
    usedBy: [1, 2],
    modified: false,
  },
};

export const Button4 = Template.bind({});
Button4.args = {
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

export const Button5 = Template.bind({});
Button5.args = {
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

export const Button6 = Template.bind({});
Button6.args = {
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
