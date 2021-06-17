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

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  options: ["sunburst"],
};
