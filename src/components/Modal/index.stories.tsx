// import interfaces
import { IModal } from "Interfaces";
// import modules
import { Story } from "@storybook/react/types-6-0";
// import the component
import ModalBasic from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ModalBasic,
  title: "Components/Modal",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IModal> = (args: IModal) => <ModalBasic {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  type: "delete",
  children: "You will lose of your analysis.",
};
