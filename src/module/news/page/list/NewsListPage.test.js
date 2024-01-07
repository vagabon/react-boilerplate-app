import { render } from '@testing-library/react';
import NewsService from '../../service/NewsService';
import NewsListPage from './NewsListPage';

describe('NewsListPage', () => {
  test('Given NewsListPage when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
        news: { data: {}, datas: [] },
        common: { message: '' },
      }),
    );
    jest.spyOn(NewsService, 'fetchNews').mockReturnValue(Promise.resolve({ content: [{ id: 1 }] }));
    const { container } = render(<NewsListPage />);
    expect(container.getElementsByClassName('container')[0]).toBeDefined();
  });
});
