import { render, screen } from '@testing-library/react';
import CustomForm from './CustomForm';

const COMMON_INPUT = {
  creationDate: { label: 'AUTH:FIELDS.CREATE_DATE', type: 'datetime', required: false, className: 'width50' },
  updatedDate: { label: 'AUTH:FIELDS.UPDATE_DATE', type: 'datetime', required: false, className: 'width50' },
  deletedDate: {
    label: 'AUTH:FIELDS.DELETE_DATE',
    type: 'datetime',
    required: false,
    className: 'width50',
    disabled: true,
  },
  active: { label: 'AUTH:FIELDS.ACTIVE', type: 'switch', required: false, className: 'width50' },
};

const PROFILE_M2M = {
  name: 'name',
  endPoint: 'profile',
  fields: 'name%',
  order: 'name',
  orderBy: 'asc',
};

describe('CustomForm', () => {
  test('Given CustomForm when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { history: {} },
      }),
    );
    const conf = {
      username: { label: 'AUTH:FIELDS.LOGIN', type: 'text', required: true },
      password: { label: 'AUTH:FIELDS.PASSWORD', type: 'password', required: false },
      email: { label: 'AUTH:FIELDS.EMAIL', type: 'text', email: true, required: true },
      profiles: {
        label: 'AUTH:FIELDS.PFOFILES',
        type: 'm2m',
        required: true,
        m2m: PROFILE_M2M,
        array: true,
      },
      description: { label: 'NEWS:FIELDS.DESCRIPTION', type: 'textarea', required: true },
      user: {
        label: 'NEWS:FIELDS.USER',
        type: 'select',
        listId: true,
        required: true,
        listEndPoint: '/user/',
        listName: 'username',
      },
      ...COMMON_INPUT,
    };
    render(<CustomForm conf={Object.entries(conf)} values={{}} schema={conf} />);
    expect(screen.getAllByText(/AUTH:FIELDS.PFOFILES/)[0]).toBeDefined();
  });
});
