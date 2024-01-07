import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import LoginPage from './LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'auth/LoginPage',
  component: LoginPage,
  tags: ['auth'],
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
