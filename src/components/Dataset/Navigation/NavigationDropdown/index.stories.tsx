// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import NavigationDropdown from "./index";

// import static values
import { storyStore } from "utils/defaults";

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

export const Dropdown1 = Template.bind({});
Dropdown1.args = {
  store: storyStore,
  selectedId: 0,
  hidden: false,
};

export const Dropdown2 = Template.bind({});
Dropdown2.args = {
  store: storyStore,
  selectedId: 2,
  hidden: true,
};
