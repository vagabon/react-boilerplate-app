import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import LoginPage from './LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'module/auth/LoginPage',
  component: LoginPage,
  tags: ['module/auth'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Primary: Story = {
  args: {},
};
Primary.parameters = {
  jest: [],
};
