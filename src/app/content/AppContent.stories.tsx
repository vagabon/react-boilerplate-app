import type { Meta, StoryObj } from '@storybook/react';

import { withProvider, withTest } from '../../stories/Helpers';
import AppContent from './AppContent';

const meta: Meta<typeof AppContent> = {
  title: 'mui/AppContent',
  component: AppContent,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof AppContent>;

export const Primary: Story = {
  args: {
    className: 'className',
    children: 'children',
  },
};
Primary.parameters = {
  jest: ['AppContent.test'],
};
