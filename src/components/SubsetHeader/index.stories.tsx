// import interfaces
import { ISubset } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import SubsetHeader from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: SubsetHeader,
  title: "Subset/Header",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<ISubset> = (args: ISubset) => <SubsetHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 0,
  type: "subset",
  label: "root",
  description: "The subset containing all of the documents",
  nDocuments: 234,
  resultedIn: 0,
  usedBy: [1, 2],
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  id: 1,
  type: "subset",
  label: "root",
  description: `Well, we did do the nose. Camelot! Bring her forward! What a strange person. I dunno. Must be a king.

  We found them.
  It's only a model.
  The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king.
  Burn her! It's only a model. Well, what do you want? We shall say 'Ni' again to you, if you do not appease us.`,
  nDocuments: 234,
  resultedIn: 1,
  usedBy: [3],
};
