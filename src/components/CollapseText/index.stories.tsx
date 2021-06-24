// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import Collapse from "./index";

const content = `Well, we did do the nose. Camelot! Bring her forward! What a strange person. I dunno. Must be a king.

We found them.
It's only a model.
The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king.
Burn her! It's only a model. Well, what do you want? We shall say 'Ni' again to you, if you do not appease us.

Shh! Knights, I bid you welcome to your new home. Let us ride to Camelot! Did you dress her up like this? Well, Mercia's a temperate zone! The swallow may fly south with the sun, and the house martin or the plover may seek warmer climes in winter, yet these are not strangers to our land.

What do you mean? I have to push the pram a lot. Well, I got better. He hasn't got shit all over him.

Ah, now we see the violence inherent in the system! Camelot! Did you dress her up like this? No, no, no! Yes, yes. A bit. But she's got a wart.

Be quiet! What do you mean? Well, she turned me into a newt. Well, she turned me into a newt.

I don't want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! A newt?

Well, what do you want? The Knights Who Say Ni demand a sacrifice! Shut up! Will you shut up?! She looks like one. Shut up! Will you shut up?!

You don't vote for kings. …Are you suggesting that coconuts migrate? Why do you think that she is a witch? We found them. Well, what do you want?

What a strange person. Who's that then? Ah, now we see the violence inherent in the system! The Knights Who Say Ni demand a sacrifice! Who's that then?

How do you know she is a witch? Bring her forward! Well, we did do the nose. The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king.

Well, I didn't vote for you. We found them. Knights of Ni, we are but simple travelers who seek the enchanter who lives beyond these woods. And the hat. She's a witch! Camelot!`;

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Collapse,
  title: "Components/Collapse Text",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type CollapseProps = React.ComponentProps<typeof Collapse>;
const Template: Story<CollapseProps> = (args: CollapseProps) => (
  <Collapse {...args} />
);

export const Default = Template.bind({});
Default.args = {
  collapsed: true,
  children: content,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  collapsed: true,
  children: content,
};

export const Extended = Template.bind({});
Extended.args = {
  collapsed: false,
  children: content,
};

export const ShortText = Template.bind({});
ShortText.args = {
  collapsed: true,
  children:
    "Well, we did do the nose. Camelot! Bring her forward! What a strange person. I dunno. Must be a king.",
};
