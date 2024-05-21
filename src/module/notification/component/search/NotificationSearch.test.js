import { render } from '@testing-library/react';
import { NotificationSearch } from './NotificationSearch';

const mockSearch = jest.fn();

jest.mock('../../hook/search/useNotificationSearch', () => ({
  useNotificationSearch: () => ({
    notifications: [],
    custumList: [],
    search: '',
    page: 0,
    doSearch: () => mockSearch,
    doChangePage: jest.fn(),
  }),
}));

describe('NotificationSearch', () => {
  test('Given NotificationSearch when its mount then ', () => {
    render(<NotificationSearch />);
    expect(mockSearch).toBeCalled();
  });
});
