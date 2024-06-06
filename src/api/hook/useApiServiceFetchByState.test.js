import { renderHook } from '@testing-library/react';
import { useApiServiceFetchByState } from './useApiServiceFetchByState';

describe('useApiServiceFetchByState', () => {
  beforeEach(() => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { message: '' } },
        test: { datas: [], search: '', count: 0, page: 0 },
      }),
    );
  });

  test('Given useApiServiceFetchByState When fetchBy Then service is called', async () => {
    const { result } = renderHook(() => useApiServiceFetchByState('test'));
    expect(result.current.datas.length).toBe(0);
  });
});
