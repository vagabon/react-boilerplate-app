import { render } from '@testing-library/react';
import AdminTabPage from './AdminTabPage';

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

describe('AdminTabPage', () => {
  test('Given AdminTabPage when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
        admin: {},
      }),
    );
    const mockConf = {
      tabs: [
        {
          name: 'user',
          label: 'AUTH:USER:TITLE',
          findByChamps: 'username%And|Email%',
          sortBy: 'username',
          cells: [
            { label: 'AUTH:FIELDS.LOGIN', name: 'username', order: true },
            { label: 'AUTH:FIELDS.EMAIL', name: 'email', order: true },
            { label: 'AUTH:FIELDS.PFOFILES', name: 'profiles.name' },
            { label: 'AUTH:FIELDS.ACTIVE', name: 'active' },
          ],
          form: {
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
            ...COMMON_INPUT,
          },
        },
      ],
    };
    render(<AdminTabPage conf={mockConf} />);
  });
});
