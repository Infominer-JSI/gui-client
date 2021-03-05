// import interfaces
import { IDropdownList } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import DropdownList from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DropdownList,
  title: "Components/Dropdown/list",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IDropdownList> = (args: IDropdownList) => (
  <DropdownList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedId: 0,
  hidden: false,
  options: ["sunburst"],
};

export const Multiple = Template.bind({});
Multiple.args = {
  selectedId: 1,
  hidden: false,
  options: ["keywords", "wordcloud"],
};

export const Hidden = Template.bind({});
Hidden.args = {
  selectedId: 1,
  hidden: true,
  options: ["keywords", "wordcloud"],
};
