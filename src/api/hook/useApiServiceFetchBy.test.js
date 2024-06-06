import { renderHook } from '@testing-library/react';
import { ApiService } from '../service/ApiService';
import { useApiServiceFetchBy } from './useApiServiceFetchBy';

describe('useApiServiceFetchBy', () => {
  beforeEach(() => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { message: '' } },
        test: { datas: [], search: '', count: 0, page: 0 },
      }),
    );
  });

  test('Given useApiServiceFetchBy When fetchBy Then service is called', async () => {
    const mockService = jest
      .spyOn(ApiService, 'findBy')
      .mockReturnValue(Promise.resolve({ content: [{ data: 'TEST' }] }));
    const action = {
      setData: jest.fn(),
      setDatas: jest.fn(),
      setSearchAndPage: jest.fn(),
      setCount: jest.fn(),
      setPage: jest.fn(),
      setOrder: jest.fn(),
    };
    const { result } = renderHook(() => useApiServiceFetchBy('http://', 'test', '/uri', 'query', action));
    await result.current.doFetchByFields('values', 0, { order: 'order', orderAsc: true });
    expect(mockService).toHaveBeenCalledTimes(1);

    const callback = jest.fn();
    await result.current.doSearch('values', callback);
    expect(action.setSearchAndPage).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);

    await result.current.doChangePage(0, callback)(1);
    expect(action.setPage).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(2);

    await result.current.doChangeOrder('date', callback);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
