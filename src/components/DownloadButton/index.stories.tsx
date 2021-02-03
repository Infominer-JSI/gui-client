// import interfaces
import { IDownloadButton } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import DownloadButton from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DownloadButton,
  title: "Components/Button (Download)",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IDownloadButton> = (args: IDownloadButton) => (
  <DownloadButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  downloadLink:
    "https://live.staticflickr.com/6014/5891611902_5c529db2cc_b.jpg",
  filename: "image.jpg",
};

export const Dark = Template.bind({});
Dark.args = {
  downloadLink:
    "https://live.staticflickr.com/6014/5891611902_5c529db2cc_b.jpg",
  filename: "image.jpg",
  dark: true,
};
