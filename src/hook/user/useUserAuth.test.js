import { renderHook } from '@testing-library/react';
import AuthService from '../../module/auth/service/AuthService';
import { useUserAuth } from './useUserAuth';

describe('useUserAuth', () => {
  test('Given useUserAuth When handleLogout Then service is called', async () => {
    const mockService = jest.spyOn(AuthService, 'logout').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() => useUserAuth());
    await result.current.handleLogout();
    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
