// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Checkbox from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Checkbox,
  title: "Components/Checkbox",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type CheckboxProps = React.ComponentProps<typeof Checkbox>;
const Template: Story<CheckboxProps> = (args: CheckboxProps) => (
  <Checkbox {...args} />
);

export const Checkbox0 = Template.bind({});
Checkbox0.args = {
  checked: false,
};

export const Checkbox1 = Template.bind({});
Checkbox1.args = {
  checked: true,
};

export const Checkbox2 = Template.bind({});
Checkbox2.args = {
  checked: true,
};
