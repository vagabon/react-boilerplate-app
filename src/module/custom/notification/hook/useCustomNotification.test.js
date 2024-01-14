import { act, renderHook } from '@testing-library/react';
import { ApiService } from '../../../../api/service/ApiService';
import { useCustomNotification } from './useCustomNotification';

describe('useCustomNotification', () => {
  test('Given useCustomNotification when is mount with an id Then ', async () => {
    const { result } = renderHook(() => useCustomNotification());

    const mockServiceGet = spyOn(ApiService, 'findBy', { content: [{ id: 1 }] });
    await act(async () => {
      await result.current.doSearch([])('');
    });
    expect(mockServiceGet).toBeCalled();

    await act(async () => {
      await result.current.doChangePage([], 0)(1);
    });
    expect(mockServiceGet).toBeCalled();
  });
});
