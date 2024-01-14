import { render } from '@testing-library/react';
import CustomNotification from './CustomNotification';

const mockSearch = jest.fn();

jest.mock('../hook/useCustomNotification', () => ({
  useCustomNotification: () => ({
    notifications: [],
    custumList: [],
    search: '',
    page: 0,
    doSearch: () => mockSearch,
    doChangePage: jest.fn(),
  }),
}));

describe('CustomNotification', () => {
  test('Given CustomNotification when its mount then ', () => {
    render(<CustomNotification />);
    expect(mockSearch).toBeCalled();
  });
});
