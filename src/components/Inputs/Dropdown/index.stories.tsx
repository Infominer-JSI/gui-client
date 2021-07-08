// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import Dropdown from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Dropdown,
  title: "Components/Dropdown",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type DropdownProps = React.ComponentProps<typeof Dropdown>;
const Template: Story<DropdownProps> = (args: DropdownProps) => (
  <Dropdown {...args} />
);

export const Dropdown0 = Template.bind({});
Dropdown0.args = {
  selectedId: 0,
  options: ["sunburst"],
};

export const Dropdown1 = Template.bind({});
Dropdown1.args = {
  selectedId: 0,
  options: ["number", "datetime", "category", "class", "text"],
};
