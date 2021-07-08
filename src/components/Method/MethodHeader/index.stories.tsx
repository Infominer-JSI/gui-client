// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import MethodHeader from "./index";

// import static values
import { storyStore } from "utils/storybookDefaults";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: MethodHeader,
  title: "Method/Header",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type MethodHeaderProps = React.ComponentProps<typeof MethodHeader>;
const Template: Story<MethodHeaderProps> = (args: MethodHeaderProps) => (
  <MethodHeader {...args} />
);

export const Header1 = Template.bind({});
Header1.args = {
  store: storyStore,
  methodId: 0,
};

export const Header2 = Template.bind({});
Header2.args = {
  store: storyStore,
  methodId: 1,
};

export const Header3 = Template.bind({});
Header3.args = {
  store: storyStore,
  methodId: 5,
};
