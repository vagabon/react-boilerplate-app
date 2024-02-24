import { renderHook } from '@testing-library/react';
import { ApiCrudService } from '../service/crud/ApiCrudService';
import { useApiServiceCrud } from './useApiServiceCrud';

describe('useApiServiceCrud', () => {
  beforeEach(() => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { message: '' } },
      }),
    );
  });

  test('Given useApiServiceCrud When createOrUpdate Then service is called', async () => {
    const mockService = jest.spyOn(ApiCrudService, 'createOrUpdate').mockReturnValue(Promise.resolve({ id: 1 }));
    const { result } = renderHook(() => useApiServiceCrud());
    const callback = jest.fn();
    await result.current.createOrUpdate('/url', { id: 1 }, '', callback);
    expect(mockService).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('Given useApiServiceCrud When createOrUpdate Then service is called', async () => {
    const mockService = jest.spyOn(ApiCrudService, 'createOrUpdate').mockReturnValue(Promise.resolve({ id: 1 }));
    const { result } = renderHook(() => useApiServiceCrud());
    const callback = jest.fn();
    await result.current.createOrUpdate('/url', {}, '', callback);
    expect(mockService).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('Given useApiServiceCrud When createOrUpdate Then service is called', async () => {
    const mockService = jest.spyOn(ApiCrudService, 'createOrUpdate').mockRejectedValue(new Error('Async error'));
    const { result } = renderHook(() => useApiServiceCrud());
    const callback = jest.fn();
    await result.current.createOrUpdate('/url', { id: 1 }, '', callback);
    expect(mockService).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
