// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Footer from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Footer,
  title: "Components/Footer",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story = () => <Footer />;

export const Default = Template.bind({});
