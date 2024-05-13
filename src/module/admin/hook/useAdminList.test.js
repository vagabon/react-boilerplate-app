import { renderHook } from '@testing-library/react';
import { AdminService } from '../service/AdminService';
import { useAdminList } from './useAdminList';

describe('useAdminList', () => {
  test('Given useAdminList When fetchTools with empty parameters Then service is not called', () => {
    const mockService = jest.spyOn(AdminService, 'findBy').mockReturnValue(Promise.resolve({}));
    renderHook(() => useAdminList());
    expect(mockService).toHaveBeenCalledTimes(0);
  });

  test('Given useAdminList When fetchTools Then service is called', async () => {
    const mockService = jest.spyOn(AdminService, 'findBy').mockReturnValue(Promise.resolve({}));
    const { result } = renderHook(() =>
      useAdminList(
        'http://',
        'name',
        { name: 'name' },
        { filter: { search: '' }, table: { page: 0, rowsPerPage: 10, sortBy: 'id', sortByOrder: 'asc' } },
      ),
    );
    await result.current.handleSearch();
    await result.current.handleTableChange();
    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
