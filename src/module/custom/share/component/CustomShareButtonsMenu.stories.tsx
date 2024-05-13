import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import { CustomShareButtonsMenu } from './CustomShareButtonsMenu';

const meta: Meta<typeof CustomShareButtonsMenu> = {
  title: 'custom/share/CustomShareButtonsMenu',
  component: CustomShareButtonsMenu,
  tags: ['custom/share'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof CustomShareButtonsMenu>;

export const Primary: Story = {
  args: { url: 'test' },
};
Primary.parameters = {
  jest: [],
};
