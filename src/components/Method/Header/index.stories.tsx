// import interfaces
import { IMethodComponent } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { dataset } from "utils/defaults";
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

const Template: Story<IMethodComponent> = (args: IMethodComponent) => (
  <MethodHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  methodId: 0,
  dataset,
};
