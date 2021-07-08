// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import DatasetNavigationMetadata from "./index";

// import static values
import { storyStore } from "utils/storybookDefaults";

// ==============================================
// Configure story
// ==============================================

const storyComponent = {
  component: DatasetNavigationMetadata,
  title: "Dataset/Dataset Navigation/Metadata",
};

export default storyComponent;

// ==============================================
// Configure story component definition
// ==============================================

type SubsetHeaderProps = React.ComponentProps<typeof DatasetNavigationMetadata>;
const Template: Story<SubsetHeaderProps> = (args: SubsetHeaderProps) => {
  return <DatasetNavigationMetadata {...args} />;
};

// ==============================================
// Configure story versions
// ==============================================

export const Metadata1 = Template.bind({});
Metadata1.args = {
  store: storyStore,
  subsetId: 0,
};
