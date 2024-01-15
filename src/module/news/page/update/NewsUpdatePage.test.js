import { render } from '@testing-library/react';
import NewsService from '../../service/NewsService';
import NewsUpdatePage from './NewsUpdatePage';

describe('NewsUpdatePage', () => {
  test('Given NewsUpdatePage when its mount then ', () => {
    global.mockParams = { id: 1 };
    let mockData = [];
    mockData[1] = { id: 1 };
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
        news: { data: mockData, datas: [] },
        common: { message: '', history: [] },
      }),
    );
    jest.spyOn(NewsService, 'fetchById').mockReturnValue(Promise.resolve({ id: 1 }));
    const { container } = render(<NewsUpdatePage />);
    expect(container.getElementsByClassName('mardown-with-summary')[0]).toBeDefined();
  });
});
