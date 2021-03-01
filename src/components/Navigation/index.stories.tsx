// import interfaces
import { INavigation } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { dataset } from "utils/defaults";
// import the component
import Navigation from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Navigation,
  title: "Dataset/Navigation",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<INavigation> = (args: INavigation) => (
  <Navigation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  dataset,
};

export const Subset = Template.bind({});
Subset.args = {
  selectedId: 4,
  dataset,
};
