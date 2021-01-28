// import interfaces
import { IButton } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Button from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Button,
  title: "Button",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IButton> = (args: IButton) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "40px",
  height: "40px",
  children: <FontAwesomeIcon icon={faPen} />,
};

export const Edit = Template.bind({});
Edit.args = {
  width: "40px",
  height: "40px",
  type: "edit",
  children: <FontAwesomeIcon icon={faPen} />,
};

export const Error = Template.bind({});
Error.args = {
  width: "40px",
  height: "40px",
  type: "delete",
  children: <FontAwesomeIcon icon={faTimes} />,
};
