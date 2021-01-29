// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ResponsiveGrid from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ResponsiveGrid,
  title: "Responsive Grid",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story = (args: any) => <ResponsiveGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div key="1">1</div>,
};

export const Multiple = Template.bind({});
Multiple.args = {
  children: [
    <div key="1">1</div>,
    <div key="2">2</div>,
    <div key="3">3</div>,
    <div key="4">4</div>,
    <div key="5">5</div>,
    <div key="6">6</div>,
  ],
};

export const MultipleOrganized = Template.bind({});
MultipleOrganized.args = {
  children: [
    <div
      key="1"
      data-grid={{ x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
    ></div>,
    <div
      key="2"
      data-grid={{ x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
    ></div>,
    <div
      key="3"
      data-grid={{ x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
    ></div>,
    <div
      key="4"
      data-grid={{ x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 }}
    ></div>,
    <div
      key="5"
      data-grid={{ x: 0, y: 2, w: 3, h: 2, minW: 2, minH: 2 }}
    ></div>,
    <div
      key="6"
      data-grid={{ x: 6, y: 2, w: 3, h: 2, minW: 2, minH: 2 }}
    ></div>,
  ],
};