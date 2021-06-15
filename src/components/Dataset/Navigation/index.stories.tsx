// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
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

type NavigationProps = React.ComponentProps<typeof Navigation>;
const Template: Story<NavigationProps> = (args: NavigationProps) => (
  <Navigation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
};

export const Subset = Template.bind({});
Subset.args = {
  selectedId: 4,
};
