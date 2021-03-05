// import interfaces
import { IButtonDownload } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ButtonDownload from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ButtonDownload,
  title: "Components/Button/Download",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IButtonDownload> = (args: IButtonDownload) => (
  <ButtonDownload {...args} />
);

const getFileFromURL = async () => {
  // download from the link and create a blob
  const response = await fetch(
    "https://live.staticflickr.com/6014/5891611902_5c529db2cc_b.jpg"
  );
  const blob = await response.blob();
  // create the URL and a element to download the file
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = "image.jpg";
  a.href = url;
  // download
  a.click();
};

export const Default = Template.bind({});
Default.args = {
  onClick: getFileFromURL,
};

export const Small = Template.bind({});
Small.args = {
  onClick: getFileFromURL,
  size: "small",
};

export const Dark = Template.bind({});
Dark.args = {
  onClick: getFileFromURL,
  dark: true,
};

export const SmallDark = Template.bind({});
SmallDark.args = {
  onClick: getFileFromURL,
  dark: true,
  size: "small",
};
