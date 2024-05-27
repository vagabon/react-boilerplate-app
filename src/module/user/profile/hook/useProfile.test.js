import { renderHook } from '@testing-library/react';
import { useProfile } from './useProfile';

describe('useProfile', () => {
  test('Given useProfile when is mount with an id Then ', () => {
    const { result } = renderHook(() => useProfile());

    let tested = result.current.hasUserRole();
    expect(tested).toBe(true);

    tested = result.current.hasUserRole(['user']);
    expect(tested).toBe(false);

    tested = result.current.hasUserRole(['user'], ['user']);
    expect(tested).toBe(false);
  });

  test('Given useProfile when is mount with an id Then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({ auth: { user: { user: { profiles: [{ roles: 'user' }] } } } }),
    );

    const { result } = renderHook(() => useProfile());

    let tested = result.current.hasUserRole();
    expect(tested).toBe(true);

    tested = result.current.hasUserRole(['user']);
    expect(tested).toBe(true);

    tested = result.current.hasUserRole(['user'], ['admin']);
    expect(tested).toBe(true);
  });
});
