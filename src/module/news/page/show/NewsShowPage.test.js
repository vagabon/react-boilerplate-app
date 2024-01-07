import { render } from '@testing-library/react';
import NewsService from '../../service/NewsService';
import NewsShowPage from './NewsShowPage';

describe('NewsShowPage', () => {
  test('Given NewsShowPage when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
        news: { data: {}, datas: [] },
        common: { message: '' },
      }),
    );
    jest.spyOn(NewsService, 'fetchById').mockReturnValue(Promise.resolve({ id: 1 }));
    const { container } = render(<NewsShowPage />);
    expect(container.getElementsByClassName('mardown-with-summary')[0]).toBeDefined();
  });
});
