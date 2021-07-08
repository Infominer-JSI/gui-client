// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import DatasetNavigationActions from "./index";

// import static values
import { storyStore } from "utils/storybookDefaults";

// ==============================================
// Configure story
// ==============================================

const storyComponent = {
  component: DatasetNavigationActions,
  title: "Dataset/Dataset Navigation/Actions",
};

export default storyComponent;

// ==============================================
// Configure story component definition
// ==============================================

type DatasetNavigationActionsProps = React.ComponentProps<
  typeof DatasetNavigationActions
>;
const Template: Story<DatasetNavigationActionsProps> = (
  args: DatasetNavigationActionsProps
) => {
  return <DatasetNavigationActions {...args} />;
};

// ==============================================
// Configure story versions
// ==============================================

export const Actions1 = Template.bind({});
Actions1.args = {
  store: storyStore,
  subsetId: 0,
};

export const Actions2 = Template.bind({});
Actions2.args = {
  store: storyStore,
  subsetId: 1,
};
