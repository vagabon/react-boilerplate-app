import { act, renderHook } from '@testing-library/react';
import NewsService from '../service/NewsService';
import { useFetchNews } from './useFetchNews';

describe('useFetchNews', () => {
  test('Given useFetchNews when is mount with an id Then ', async () => {
    const { result } = renderHook(() => useFetchNews());

    const mockServiceGet = spyOn(NewsService, 'fetchNews', { content: [{ id: 1 }] });
    await act(async () => {
      await result.current.doSearch();
    });
    expect(mockServiceGet).toBeCalled();

    await act(async () => {
      await result.current.doChangePage(0)(1);
    });
    expect(mockServiceGet).toBeCalled();
  });
});
