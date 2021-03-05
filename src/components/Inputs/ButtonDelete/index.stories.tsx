import { IButtonDelete } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import DeleteButton from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DeleteButton,
  title: "Components/Button/Delete",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IButtonDelete> = (args: IButtonDelete) => (
  <DeleteButton {...args} />
);

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};
