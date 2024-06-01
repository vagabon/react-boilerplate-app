import { renderHook, waitFor } from '@testing-library/react';
import { useNotification } from './useNotification';

describe('useNotification', () => {
  test('Given useNotification when is mount Then ', async () => {
    const { result } = renderHook(() => useNotification());

    const callback = jest.fn();
    result.current.updateNotification({}, callback);

    result.current.handleReadAll(callback)();

    result.current.handleCheckbox([{ id: 1 }])(1);

    await waitFor(() => {
      result.current.handleClick([{ id: 1 }])({ id: 1 });
    });
  });
});
