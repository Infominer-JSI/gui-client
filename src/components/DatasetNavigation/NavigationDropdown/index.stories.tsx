// import interfaces
import { INavigationDropdown } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import NavigationDropdown from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: NavigationDropdown,
  title: "Navigation Dropdown",
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
  hidden: false,
};

export const Hidden = Template.bind({});
Hidden.args = {
  hidden: true,
};
