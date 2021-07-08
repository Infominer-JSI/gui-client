// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import ProgressBar from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ProgressBar,
  title: "Components/Progress Bar",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type ProgressBarProps = React.ComponentProps<typeof ProgressBar>;
const Template: Story<ProgressBarProps> = (args: ProgressBarProps) => (
  <ProgressBar {...args} />
);

export const Waiting = Template.bind({});
Waiting.args = {
  progress: 0,
};

export const Processing = Template.bind({});
Processing.args = {
  progress: 30,
};

export const Done = Template.bind({});
Done.args = {
  progress: 100,
};
