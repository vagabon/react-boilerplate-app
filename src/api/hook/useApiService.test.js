import { renderHook } from '@testing-library/react';
import { ApiService } from '../service/ApiService';
import { useApiService } from './useApiService';

describe('useApiService', () => {
  beforeEach(() => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { message: '' } },
      }),
    );
  });

  test('Given useApiService When httpGet Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'get').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() => useApiService());
    await result.current.httpGet();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When httpGet Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'get').mockRejectedValue(new Error('Async error'));
    const { result } = renderHook(() => useApiService());
    await result.current.httpGet();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When httpPost Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() => useApiService());
    await result.current.httpPost();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When fetchTools Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'post').mockRejectedValue(new Error('Async error'));
    const { result } = renderHook(() => useApiService());
    await result.current.httpPost();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When httpPut Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() => useApiService());
    await result.current.httpPut();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When httpPut Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'put').mockRejectedValue(new Error('Async error'));
    const { result } = renderHook(() => useApiService());
    await result.current.httpPut();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When deleteById Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'delete').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() => useApiService());
    await result.current.deleteById();
    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('Given useApiService When deleteById Then service is called', async () => {
    const mockService = jest.spyOn(ApiService, 'delete').mockRejectedValue(new Error('Async error'));
    const { result } = renderHook(() => useApiService());
    await result.current.deleteById();
    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
