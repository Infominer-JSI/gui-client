// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import DatasetNavigation from "./index";

// import static values
import { storyStore } from "utils/storybookDefaults";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: DatasetNavigation,
  title: "Dataset/Dataset Navigation",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type NavigationProps = React.ComponentProps<typeof DatasetNavigation>;
const Template: Story<NavigationProps> = (args: NavigationProps) => (
  <DatasetNavigation {...args} />
);

export const Navigation1 = Template.bind({});
Navigation1.args = {
  store: storyStore,
  selectedId: 0,
};

export const Navigation2 = Template.bind({});
Navigation2.args = {
  store: storyStore,
  selectedId: 4,
};
