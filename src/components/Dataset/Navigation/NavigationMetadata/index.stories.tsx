// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import NavigationMetadata from "./index";

// import static values
import { storyStore } from "utils/defaults";

// ==============================================
// Configure story
// ==============================================

const storyComponent = {
  component: NavigationMetadata,
  title: "Dataset/Navigation/Metadata",
};

export default storyComponent;

// ==============================================
// Configure story component definition
// ==============================================

type SubsetHeaderProps = React.ComponentProps<typeof NavigationMetadata>;
const Template: Story<SubsetHeaderProps> = (args: SubsetHeaderProps) => {
  return <NavigationMetadata {...args} />;
};

// ==============================================
// Configure story versions
// ==============================================

export const Metadata1 = Template.bind({});
Metadata1.args = {
  store: storyStore,
  subsetId: 0,
};
