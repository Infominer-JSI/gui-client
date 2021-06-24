// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Button from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Button,
  title: "Components/Button",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type ButtonProps = React.ComponentProps<typeof Button>;
const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: "full",
  size: "medium",
  color: "blue",
  intensity: "dark",
  text: "Click me!",
};
