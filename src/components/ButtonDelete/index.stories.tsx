// import interfaces
import { IButton } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ButtonDelete from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ButtonDelete,
  title: "Button (Delete)",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IButton> = (args: IButton) => <ButtonDelete {...args} />;

export const Default = Template.bind({});
Default.args = {};
