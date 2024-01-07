import { act, renderHook } from '@testing-library/react';
import UserService from '../service/UserService';
import { useUser } from './useUser';

describe('useUser', () => {
  test('Given useUser when is mount with an id Then ', async () => {
    const { result } = renderHook(() => useUser());

    setLocalStorage('storage_name', { user: { id: 1 } });

    const mockServiceGet = spyOn(UserService, 'fetchById', { id: 1 });
    await act(async () => {
      await result.current.fetchById(1);
    });
    expect(mockServiceGet).toBeCalled();

    const mockCallback = jest.fn();
    await act(async () => {
      await result.current.handleUpdateAvatar('avatar', mockCallback);
    });
    expect(mockCallback).toBeCalled();

    const mockServiceEmail = spyOn(UserService, 'updateEmail', {});
    await act(async () => {
      await result.current.handleUpdateEmail('avatar', mockCallback);
    });
    expect(mockServiceEmail).toBeCalled();

    const mockServicePassword = spyOn(UserService, 'updatePassword', {});
    await act(async () => {
      await result.current.handleUpdatePassword('avatar', mockCallback);
    });
    expect(mockServicePassword).toBeCalled();

    let tested = result.current.isUserPassword({ id: 1 });
    expect(tested).toBe(false);

    tested = result.current.isUserPassword({ googleId: 1 });
    expect(tested).toBe(false);

    tested = result.current.isUserPassword({ facebookId: 1 });
    expect(tested).toBe(false);
  });
});
