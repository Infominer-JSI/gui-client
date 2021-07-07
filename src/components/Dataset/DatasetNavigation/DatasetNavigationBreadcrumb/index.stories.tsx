// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import Breadcrumbs from "./index";

// import static values
import { storyStore } from "utils/storybookDefaults";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Breadcrumbs,
  title: "Dataset/Dataset Navigation/Breadcrumbs",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type BreadcrumbsProps = React.ComponentProps<typeof Breadcrumbs>;
const Template: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => (
  <Breadcrumbs {...args} />
);

export const Breadcrumbs1 = Template.bind({});
Breadcrumbs1.args = {
  store: storyStore,
  selectedId: 0,
};

export const Breadcrumbs2 = Template.bind({});
Breadcrumbs2.args = {
  store: storyStore,
  selectedId: 4,
};
