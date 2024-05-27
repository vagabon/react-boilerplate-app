import { renderHook } from '@testing-library/react';
import { AuthService } from '../../service/AuthService';
import { useAuthLogout } from './useAuthLogout';

describe('useAuthLogout', () => {
  test('Given useAuthLogout When handleLogout Then service is called', async () => {
    const mockService = jest.spyOn(AuthService, 'logout').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() => useAuthLogout());
    await result.current.handleLogout();
    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
