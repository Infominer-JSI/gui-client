// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Navbar from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Navbar,
  title: "Components/Navbar",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story = () => <Navbar />;

export const Default = Template.bind({});
