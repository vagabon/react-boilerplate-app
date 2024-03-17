import { act, renderHook } from '@testing-library/react';
import NewsService from '../service/NewsService';
import { useCreateNews } from './useCreateNews';

describe('useCreateNews', () => {
  beforeEach(() => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
        news: { data: {} },
      }),
    );
  });

  test('Given useCreateNews when fetchById Then service is called', async () => {
    const { result } = renderHook(() => useCreateNews('http://', 'news', { setData: jest.fn() }));

    const mockServiceGet = spyOn(NewsService, 'fetchById', { id: 1 });
    await act(async () => {
      await result.current.fetchById(1);
    });
    expect(mockServiceGet).toBeCalled();
  });

  test('Given useCreateNews when createOrUpdateNews Then service is called', async () => {
    const { result } = renderHook(() => useCreateNews('http://', 'news', { setData: jest.fn() }));

    const mockServiceCreateOrUpdate = spyOn(NewsService, 'createOrUpdate', { id: 1 });
    await act(async () => {
      await result.current.createOrUpdateNews({ user: { id: 1 } });
    });
    expect(mockServiceCreateOrUpdate).toBeCalled();
  });
});
