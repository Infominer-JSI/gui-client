// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import UploadForm from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: UploadForm,
  title: "Upload/Form",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type UploadFormProps = React.ComponentProps<typeof UploadForm>;
const Template: Story<UploadFormProps> = (args: UploadFormProps) => (
  <UploadForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  dataset: {
    id: 1,
    filename: "dataset.txt",
    delimiter: ";",
    fields: [
      { name: "field0", type: "number", included: true },
      { name: "field1", type: "number", included: true },
      { name: "field2", type: "number", included: true },
      { name: "field3", type: "number", included: true },
      { name: "field4", type: "number", included: true },
      { name: "field5", type: "number", included: true },
    ],
  },
  metadata: {
    types: ["number", "datetime", "category", "class", "text"],
    stopwords: {
      languages: [{ label: "English", value: "en" }],
    },
  },
};
