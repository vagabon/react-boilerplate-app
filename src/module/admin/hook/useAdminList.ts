import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/Store';
import { IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { AdminAction } from '../reducer/AdminReducers';
import { AdminService } from '../service/AdminService';

export const useAdminList = (apiUrl: string, activePage: string, pageConf: IAdminTabDto, state: IAdminStateDto) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!pageConf || !state?.filter || pageConf.name !== activePage) {
      return;
    }
    AdminService.findBy(
      apiUrl,
      pageConf.name,
      pageConf.findByChamps,
      state.filter.search,
      state.table.page,
      state.table.rowsPerPage,
      { order: state.table.sortBy, orderAsc: state.table.sortByOrder === 'asc' },
    ).then((data) => {
      dispatch(AdminAction.setCount({ activePage, count: data?.totalElements }));
      dispatch(AdminAction.setDatas({ activePage, datas: data?.content ?? [] }));
    });
  }, [apiUrl, dispatch, activePage, pageConf, state?.filter, state?.table]);

  const handleSearch = useCallback(
    (search: string = '') => {
      setSearch(search);
      dispatch(AdminAction.setFilter({ activePage, filter: { search: search } }));
    },
    [dispatch, activePage],
  );

  const handleTableChange = useCallback(
    (page: number, rowsPerPage: number = 10, sortBy: string = 'id', sortByOrder: 'asc' | 'desc' = 'asc') => {
      dispatch(AdminAction.setPage({ activePage, table: { page, rowsPerPage, sortBy, sortByOrder } }));
    },
    [dispatch, activePage],
  );

  return { search, handleSearch, handleTableChange };
};
