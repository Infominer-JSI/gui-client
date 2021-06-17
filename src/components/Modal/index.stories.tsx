// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import Modal from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Modal,
  title: "Components/Modal",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type ModalProps = React.ComponentProps<typeof Modal>;
const Template: Story<ModalProps> = (args: ModalProps) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  type: "delete",
  children: "You will lose of your analysis.",
};
