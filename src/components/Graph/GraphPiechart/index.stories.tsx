// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import GraphPiechart from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: GraphPiechart,
  title: "Graph/Piechart",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type GraphPiechartProps = React.ComponentProps<typeof GraphPiechart>;
const Template: Story<GraphPiechartProps> = (args: GraphPiechartProps) => (
  <div style={{ height: "700px" }}>
    <GraphPiechart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      value: "articles",
      frequency: 3010,
      precent: 0.2700762450695038,
    },
    {
      value: "features",
      frequency: 2701,
      precent: 0.2370576411485672,
    },
    {
      value: "trump",
      frequency: 2690,
      precent: 0.2300245314836502,
    },
    {
      value: "trump",
      frequency: 1690,
      precent: 0.2300245314836502,
    },
    {
      value: "trump",
      frequency: 690,
      precent: 0.2300245314836502,
    },
    {
      value: "trump",
      frequency: 390,
      precent: 0.2300245314836502,
    },
  ],
  keys: ["articles", "features", "trump"],
};

export const Single = Template.bind({});
Single.args = {
  data: [
    {
      value: "articles",
      frequency: 3010,
      precent: 0.2700762450695038,
    },
  ],
};
