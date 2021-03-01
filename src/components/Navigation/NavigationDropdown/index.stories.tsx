// import interfaces
import { INavigationDropdown } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { dataset } from "utils/defaults";
// import the component
import NavigationDropdown from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: NavigationDropdown,
  title: "Dataset/Navigation/Dropdown",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<INavigationDropdown> = (args: INavigationDropdown) => (
  <NavigationDropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  hidden: false,
  dataset,
};

export const Hidden = Template.bind({});
Hidden.args = {
  selectedId: 2,
  hidden: true,
  dataset,
};
