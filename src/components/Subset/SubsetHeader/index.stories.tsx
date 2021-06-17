// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import SubsetHeader from "./index";

// import static values
import { storyStore } from "utils/defaults";

// ==============================================
// Configure story
// ==============================================

const storyComponent = {
  component: SubsetHeader,
  title: "Subset/Header",
};

export default storyComponent;

// ==============================================
// Configure story component definition
// ==============================================

type SubsetHeaderProps = React.ComponentProps<typeof SubsetHeader>;
const Template: Story<SubsetHeaderProps> = (args: SubsetHeaderProps) => {
  return <SubsetHeader {...args} />;
};

// ==============================================
// Configure story versions
// ==============================================

export const Default = Template.bind({});
Default.args = {
  store: storyStore,
  subsetId: 0,
};
