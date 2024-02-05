import type { Meta, StoryObj } from '@storybook/react';

import { withProvider, withTest } from '../../../stories/Helpers';
import AppFabAdd from './AppFabAdd';

const meta: Meta<typeof AppFabAdd> = {
  title: 'app/AppFabAdd',
  component: AppFabAdd,
  tags: ['app'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof AppFabAdd>;

export const Primary: Story = {
  args: {
    urlAdd: 'urlAdd',
    urlAddRole: [''],
  },
};
Primary.parameters = {
  jest: ['AppFabAdd.test'],
};
