// import interfaces
import { IButtonDropdown } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ButtonDropdown from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ButtonDropdown,
  title: "Components/Button/Dropdown",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IButtonDropdown> = (args: IButtonDropdown) => (
  <ButtonDropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  options: ["sunburst"],
};
