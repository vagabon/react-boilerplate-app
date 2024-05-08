import { renderHook } from '@testing-library/react';
import { useRole } from './useRole';

describe('useRole', () => {
  test('Given useRole when is mount with an id Then ', () => {
    const { result } = renderHook(() => useRole());

    let tested = result.current.hasUserRole();
    expect(tested).toBe(true);

    tested = result.current.hasUserRole(['user']);
    expect(tested).toBe(false);

    tested = result.current.hasUserRole(['user'], ['user']);
    expect(tested).toBe(false);
  });

  test('Given useRole when is mount with an id Then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({ auth: { user: { user: { profiles: [{ roles: 'user' }] } } } }),
    );

    const { result } = renderHook(() => useRole());

    let tested = result.current.hasUserRole();
    expect(tested).toBe(true);

    tested = result.current.hasUserRole(['user']);
    expect(tested).toBe(true);

    tested = result.current.hasUserRole(['user'], ['admin']);
    expect(tested).toBe(true);
  });
});
