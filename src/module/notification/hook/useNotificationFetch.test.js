import { renderHook } from '@testing-library/react';
import { useNotificationFetch } from './useNotificationFetch';

describe('useNotificationFetch', () => {
  test('Given useNotificationFetch when is mount Then ', () => {
    const { result } = renderHook(() => useNotificationFetch());

    result.current.doSearchNotifications('');
    result.current.doChangePageNotifications(0)(1);
  });
});
