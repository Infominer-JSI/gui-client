// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import SubsetHeader from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: SubsetHeader,
  title: "Subset/Header",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type SubsetHeaderProps = React.ComponentProps<typeof SubsetHeader>;
const Template: Story<SubsetHeaderProps> = (args: SubsetHeaderProps) => (
  <SubsetHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  subsetId: 0,
};
