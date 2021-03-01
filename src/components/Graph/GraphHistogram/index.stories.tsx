// import interfaces
import { IGraphHistogram } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import GraphHistogram from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: GraphHistogram,
  title: "Graph/Histogram",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IGraphHistogram> = (args: IGraphHistogram) => (
  <div style={{ height: "700px" }}>
    <GraphHistogram {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    count: 19878,
    max: 1520,
    mean: 1.580189153838414,
    median: 1,
    min: 0,
    stdev: 14.68817939260022,
    sum: 31411,
    values: [
      {
        min: 0,
        max: 153.52,
        frequency: 19864,
        precent: 99.93,
        percentSum: 99.92957037931382,
      },
      {
        min: 153.52,
        max: 307.04,
        frequency: 8,
        precent: 0.04,
        percentSum: 99.96981587684878,
      },
      {
        min: 307.04,
        max: 460.5600000000001,
        frequency: 3,
        precent: 0.02,
        percentSum: 99.9849079384244,
      },
      {
        min: 460.5600000000001,
        max: 614.08,
        frequency: 1,
        precent: 0.01,
        percentSum: 99.98993862561628,
      },
      {
        min: 614.08,
        max: 767.6,
        frequency: 0,
        precent: 0,
        percentSum: 99.98993862561628,
      },
      {
        min: 767.6,
        max: 921.1200000000001,
        frequency: 1,
        precent: 0.01,
        percentSum: 99.99496931280815,
      },
      {
        min: 921.1200000000001,
        max: 1074.64,
        frequency: 0,
        precent: 0,
        percentSum: 99.99496931280815,
      },
      {
        min: 1074.64,
        max: 1228.16,
        frequency: 0,
        precent: 0,
        percentSum: 99.99496931280815,
      },
      {
        min: 1228.16,
        max: 1381.68,
        frequency: 0,
        precent: 0,
        percentSum: 99.99496931280815,
      },
      {
        min: 1381.68,
        max: 1535.2,
        frequency: 1,
        precent: 0.01,
        percentSum: 100,
      },
    ],
  },
};
