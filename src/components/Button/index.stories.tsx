// import interfaces
import { IButton } from "Interfaces";
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

const Template: Story<IButton> = (args: IButton) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Press Me!",
};

export const Edit = Template.bind({});
Edit.args = {
  type: "edit",
  children: "edit",
};

export const Error = Template.bind({});
Error.args = {
  type: "delete",
  children: "delete",
};

export const Child = Template.bind({});
Child.args = {
  type: "delete",
  children: (
    <>
      <div>This is a div</div>
    </>
  ),
};
