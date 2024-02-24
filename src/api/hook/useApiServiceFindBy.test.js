import { renderHook } from '@testing-library/react';
import { ApiService } from '../service/ApiService';
import { useApiServiceFindBy } from './useApiServiceFindBy';

describe('useApiServiceFindBy', () => {
  beforeEach(() => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { message: '' } },
      }),
    );
  });

  test('Given useApiServiceFindBy When fetchBy Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'findBy').mockReturnValue(Promise.resolve({ content: [] }));
    const { result } = renderHook(() => useApiServiceFindBy());
    await result.current.fetchBy('values', 1);
    await result.current.resetStopLoad();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiServiceFindBy When fetchBy Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'findBy').mockReturnValue(Promise.resolve({ content: [] }));
    const { result } = renderHook(() => useApiServiceFindBy());
    const callback = jest.fn();
    await result.current.fetchBy('values', 0, 'date', 'asc', callback);
    await result.current.resetStopLoad();
    expect(mockService).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('Given useApiServiceFindBy When fetchBy Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'findBy').mockRejectedValue(new Error('Async error'));
    const { result } = renderHook(() => useApiServiceFindBy());
    await result.current.fetchBy('values', 0);
    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
