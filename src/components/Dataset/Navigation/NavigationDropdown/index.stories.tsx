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
  title: "Dataset/Navigation/Dropdown",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type DropdownProps = React.ComponentProps<typeof NavigationDropdown>;
const Template: Story<DropdownProps> = (args: DropdownProps) => (
  <NavigationDropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  hidden: false,
};

export const Hidden = Template.bind({});
Hidden.args = {
  selectedId: 2,
  hidden: true,
};
