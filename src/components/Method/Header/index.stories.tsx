// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import MethodHeader from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: MethodHeader,
  title: "Method/Header",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type MethodHeaderProps = React.ComponentProps<typeof MethodHeader>;
const Template: Story<MethodHeaderProps> = (args: MethodHeaderProps) => (
  <MethodHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  methodId: 0,
};

export const Clustering = Template.bind({});
Clustering.args = {
  methodId: 1,
};

export const ActiveLearning = Template.bind({});
ActiveLearning.args = {
  methodId: 5,
};
