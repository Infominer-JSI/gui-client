// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Datasets from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Datasets,
  title: "Page Datasets",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story = () => <Datasets />;

export const Default = Template.bind({});
