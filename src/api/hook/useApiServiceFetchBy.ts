import { ReducerType } from '@reduxjs/toolkit';
import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IOrderDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/Store';
import { IOrderState, IReducersActionsProps } from '../../store/reducer/BaseReducer';
import { deepEqual } from '../../store/utils/StoreUtils';
import { useApiServiceFindBy } from './useApiServiceFindBy';

export const useApiServiceFetchBy = <T extends IApiDto>(
  apiUrl: string,
  stateName: string,
  uri: string,
  query: string,
  action: IReducersActionsProps,
  max: number = 10,
  orderList: IOrderDto[] = [{ id: 'id', libelle: 'ID', orderAsc: false }],
) => {
  const dispatch = useAppDispatch();
  const datas = useAppSelector((state) => state[stateName as keyof ReducerType].datas, deepEqual);
  const search = useAppSelector((state) => state[stateName as keyof ReducerType].search, shallowEqual);
  const count = useAppSelector((state) => state[stateName as keyof ReducerType].count, shallowEqual);
  const order = useAppSelector((state) => state[stateName as keyof ReducerType].order, shallowEqual);
  const page = useAppSelector((state) => state[stateName as keyof ReducerType].page, shallowEqual);
  const { fetchBy, resetStopLoad } = useApiServiceFindBy<T>(apiUrl, uri, query, max);

  const fetchByFields = useCallback(
    (values: string, page: number, order?: IOrderState) => {
      fetchBy(
        values,
        page,
        order?.order,
        order?.orderAsc ? '' : 'desc',
        (data) => {
          dispatch(action.setCount(data.totalElements));
          dispatch(page === 0 ? action.setDatas(data?.content ?? []) : action.addDatas(data?.content ?? []));
        },
        () => {
          dispatch(action.setCount(0));
          dispatch(action.setDatas([]));
        },
      );
    },
    [fetchBy, dispatch, action],
  );

  const doFetchByFields = useCallback(
    (values: string, page: number, order?: IOrderState) => {
      fetchByFields(values, page, order);
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
    (page: number, callback: (field: string, page: number, order?: IOrderState) => void) =>
      (pageToAdd: number): void => {
        const newPage = page + pageToAdd;
        dispatch(action.setPage(newPage));
        callback(search, newPage, order);
      },
    [search, order, dispatch, action],
  );

  const doChangeOrder = useCallback(
    (value?: string | JSONObject, callback?: (field: string, order?: IOrderState) => void) => {
      const order = { order: (value ?? orderList[0].id) as string, orderAsc: false };
      dispatch(action.setOrder(order));
      resetStopLoad();
      callback?.(search, order);
    },
    [dispatch, search, action, orderList, resetStopLoad],
  );

  return {
    datas,
    search,
    count,
    page,
    doFetchByFields,
    doSearch,
    doChangePage,
    order,
    orderList,
    doChangeOrder,
  };
};
