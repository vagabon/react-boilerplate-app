import type { Meta, StoryObj } from '@storybook/react';

import { withProvider, withTest } from '../../../stories/Helpers';
import ShowMessage from './ShowMessage';

const meta: Meta<typeof ShowMessage> = {
  title: 'template/ShowMessage',
  component: ShowMessage,
  tags: ['template'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof ShowMessage>;

const callBack = () => {
  return '';
};

export const Primary: Story = {
  args: {
    url: 'url',
    cells: [{ name: 'name', label: 'label', order: true }],
    datas: [{ id: 1, name: 'name' }],
    count: 10,
    page: 0,
    rowsPerPage: 5,
    sortBy: 'name',
    sortByOrder: 'asc',
    callBack: callBack,
  },
};
Primary.parameters = {
  jest: ['ShowMessage.test'],
};
