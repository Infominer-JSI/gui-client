// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Textarea from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Textarea,
  title: "Components/Textarea",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type InputProps = React.ComponentProps<typeof Textarea>;
const Template: Story<InputProps> = (args: InputProps) => (
  <Textarea {...args} />
);

export const Textarea0 = Template.bind({});
Textarea0.args = {
  name: "default",
  placeholder: "Input value",
};

export const Textarea1 = Template.bind({});
Textarea1.args = {
  name: "default",
  value: "Field value",
  placeholder: "Input value",
};

export const Textarea2 = Template.bind({});
Textarea2.args = {
  name: "default",
  value: "Field value",
  placeholder: "Input value",
  label: "Field",
};

export const Textarea3 = Template.bind({});
Textarea3.args = {
  name: "default",
  value: "Field value",
  placeholder: "Input value",
  label: "Field",
  rows: 10,
  cols: 20,
};
