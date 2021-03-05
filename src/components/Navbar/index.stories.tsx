// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Header from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Header,
  title: "Components/Header",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story = () => <Header />;

export const Default = Template.bind({});
