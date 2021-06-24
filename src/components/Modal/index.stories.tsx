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

export const Edit = Template.bind({});
Edit.args = {
  header: "Edit subset",
  isOpen: true,
  type: "edit",
  children: "Do you really want to update the values?",
};

export const Delete = Template.bind({});
Delete.args = {
  isOpen: true,
  type: "delete",
  children: "You will lose of your analysis.",
};

export const Exec = Template.bind({});
Exec.args = {
  header: "Run KMeans Clustering",
  isOpen: true,
  type: "exec",
  children: "You will run the experiment.",
};
