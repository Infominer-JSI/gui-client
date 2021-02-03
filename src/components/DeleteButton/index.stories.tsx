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
  title: "Components/Button/Delete",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<{ dark?: boolean }> = (args: { dark?: boolean }) => (
  <ButtonDelete {...args} />
);

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};
