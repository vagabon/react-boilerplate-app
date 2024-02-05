import type { Meta, StoryObj } from '@storybook/react';

import { withProvider, withTest } from '../../stories/Helpers';
import AppContent from './AppContent';

const meta: Meta<typeof AppContent> = {
  title: 'app/AppContent',
  component: AppContent,
  tags: ['app'],
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
