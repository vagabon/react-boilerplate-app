import { renderHook } from '@testing-library/react';
import { useAppLocation } from './useAppLocation';

describe('useAppLocation', () => {
  test('Given useAppLocation when goBack Then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { loading: false, history: [] },
      }),
    );

    const { result } = renderHook(() => useAppLocation());

    result.current.goBack();

    expect(result.history).not.toBeNull();
  });

  test('Given useAppLocation when goBack Then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { loading: false, history: [{ link: 'link1' }, { link: 'link2' }, { link: 'link3' }] },
      }),
    );

    const { result } = renderHook(() => useAppLocation());

    result.current.goBack();

    expect(result.history).not.toBeNull();
  });
});
