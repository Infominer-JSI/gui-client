// import interfaces
import { IGraphBarchart } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import GraphBarchart from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: GraphBarchart,
  title: "Graph/Barchart",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IGraphBarchart> = (args: IGraphBarchart) => (
  <div style={{ height: "700px" }}>
    <GraphBarchart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      value: "articles",
      frequency: 0.27,
      precent: 0.2700762450695038,
    },
    {
      value: "features",
      frequency: 0.23,
      precent: 0.2370576411485672,
    },
    {
      value: "trump",
      frequency: 0.23,
      precent: 0.2300245314836502,
    },
  ],
};

export const Single = Template.bind({});
Single.args = {
  data: [
    {
      value: "articles",
      frequency: 0.27,
      precent: 0.2700762450695038,
    },
  ],
};
