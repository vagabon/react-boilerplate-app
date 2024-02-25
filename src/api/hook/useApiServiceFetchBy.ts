import { ReducerType } from '@reduxjs/toolkit';
import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { IReducersActionsProps } from '../../reducer/BaseReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';
import { useApiServiceFindBy } from './useApiServiceFindBy';

export const useApiServiceFetchBy = <T extends IApiDto>(
  stateName: string,
  uri: string,
  query: string,
  action: IReducersActionsProps,
  max: number = 10,
) => {
  const dispatch = useAppDispatch();
  const { datas, search, count, page } = useAppSelector((state) => state[stateName as keyof ReducerType]);
  const { fetchBy, resetStopLoad } = useApiServiceFindBy<T>(uri, query, max);

  const fetchByFields = useCallback(
    (values: string, page: number, orderBy: string, orderByAsc: string) => {
      fetchBy(values, page, orderBy, orderByAsc, (data) => {
        dispatch(action.setCount(data.totalElements));
        dispatch(page === 0 ? action.setDatas(data?.content ?? []) : action.addDatas(data?.content ?? []));
      });
    },
    [fetchBy, dispatch, action],
  );

  const doFetchByFields = useCallback(
    (values: string, page: number, orderBy: string = 'creationDate', orderByAsc: string = 'desc') => {
      fetchByFields(values, page, orderBy, orderByAsc);
    },
    [fetchByFields],
  );

  const doSearch = useCallback(
    (field: string, callback: (field: string) => void): void => {
      document.getElementById('infinite-container')?.scrollTo(0, 0);
      resetStopLoad();
      dispatch(action.setSearchAndPage({ page: 0, search: field }));
      callback(field);
    },
    [dispatch, resetStopLoad, action],
  );

  const doChangePage = useCallback(
    (page: number, callback: (field: string, page: number) => void) =>
      (pageToAdd: number): void => {
        const newPage = page + pageToAdd;
        dispatch(action.setPage(newPage));
        callback(search, newPage);
      },
    [search, dispatch, action],
  );

  return { datas, search, count, page, doFetchByFields, doSearch, doChangePage };
};
