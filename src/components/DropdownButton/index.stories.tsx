// import interfaces
import { IDropdownButton } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import DropdownButton from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DropdownButton,
  title: "Components/Button/Dropdown",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IDropdownButton> = (args: IDropdownButton) => (
  <DropdownButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  options: ["sunburst"],
};
