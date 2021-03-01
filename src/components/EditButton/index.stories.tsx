// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ButtonEdit from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ButtonEdit,
  title: "Components/Button/Edit",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<{ dark?: boolean }> = (args: { dark?: boolean }) => (
  <ButtonEdit {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};
