import { ReducerType } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../store/Store';
import { deepEqual } from '../../store/utils/StoreUtils';

export const useApiServiceFetchByState = (stateName: string) => {
  const datas = useAppSelector((state) => state[stateName as keyof ReducerType].datas, deepEqual);
  const search = useAppSelector((state) => state[stateName as keyof ReducerType].search, shallowEqual);
  const count = useAppSelector((state) => state[stateName as keyof ReducerType].count, shallowEqual);
  const order = useAppSelector((state) => state[stateName as keyof ReducerType].order, shallowEqual);
  const page = useAppSelector((state) => state[stateName as keyof ReducerType].page, shallowEqual);

  return {
    datas,
    search,
    count,
    page,
    order,
  };
};
