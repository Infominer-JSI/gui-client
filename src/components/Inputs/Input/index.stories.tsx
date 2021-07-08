// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Input from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Input,
  title: "Components/Input",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type InputProps = React.ComponentProps<typeof Input>;
const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />;

export const Input0 = Template.bind({});
Input0.args = {
  type: "text",
  name: "default",
  placeholder: "Input value",
};

export const Input1 = Template.bind({});
Input1.args = {
  type: "text",
  name: "default",
  value: "Field value",
  placeholder: "Input value",
};

export const Input2 = Template.bind({});
Input2.args = {
  type: "text",
  name: "default",
  value: "Field value",
  placeholder: "Input value",
  label: "Field",
};
