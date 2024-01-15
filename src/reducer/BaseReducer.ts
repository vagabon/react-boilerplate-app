import { PayloadAction } from '@reduxjs/toolkit';
import { IApiDto } from '@vagabond-inc/react-boilerplate-md';

export type ActionReturn = { payload: IApiDto; type: string };

export interface ReducerCrudState {
  datas: IApiDto[];
  data: IApiDto[];
  count: number;
  search: string;
  page: number;
}

export const DefaultState: ReducerCrudState = { datas: [], data: [], search: '', page: 0, count: 0 };

export const ReducersActions = {
  setDatas: <T extends ReducerCrudState>(state: T, action: PayloadAction<IApiDto[]>) => {
    return {
      ...state,
      datas: action.payload,
    };
  },
  addDatas: <T extends ReducerCrudState>(state: T, action: PayloadAction<IApiDto[]>) => {
    const oldDatas: IApiDto[] = [...state.datas];
    action.payload.forEach((item: IApiDto) => oldDatas.push(item));
    return {
      ...state,
      datas: oldDatas,
    };
  },
  updataDatas: <T extends ReducerCrudState>(state: T, action: PayloadAction<IApiDto>) => {
    let newDatas: IApiDto[] = [...state.datas];
    newDatas = newDatas.map((data) => {
      return data.id === action.payload.id ? action.payload : data;
    });
    return {
      ...state,
      datas: newDatas,
    };
  },
  setData: <T extends ReducerCrudState>(state: T, action: PayloadAction<IApiDto>) => {
    const data = [...state.data];
    data[action.payload.id as number] = action.payload;
    return {
      ...state,
      data: data,
    };
  },
  setCount: <T extends ReducerCrudState>(state: T, action: PayloadAction<number>) => ({
    ...state,
    count: action.payload,
  }),
  setSearch: <T extends ReducerCrudState>(state: T, action: PayloadAction<string>) => ({
    ...state,
    search: action.payload,
  }),
  setPage: <T extends ReducerCrudState>(state: T, action: PayloadAction<number>) => ({
    ...state,
    page: action.payload,
  }),
  setSearchAndPage: <T extends ReducerCrudState>(
    state: T,
    action: PayloadAction<{ search: string; page: number }>,
  ) => ({
    ...state,
    search: action.payload.search,
    page: action.payload.page,
  }),
};
