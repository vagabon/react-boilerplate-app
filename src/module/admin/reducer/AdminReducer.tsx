import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { IAdminFilterDto, IAdminReducerDto, IAdminStateDto, IAdminTableDto } from '../dto/AdminReducerDto';

const getPageState = (page: string, state: IAdminReducerDto) => {
  return { ...state[page as keyof IAdminReducerDto] };
};

const getState = (page: string, state: IAdminReducerDto, newState: IAdminStateDto) => {
  return {
    ...state,
    [page]: newState,
  };
};

export const initialState = {};

export const AdminReducer = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {
    setState: (state: IAdminReducerDto, action: PayloadAction<{ activePage: string; newState: IAdminStateDto }>) => {
      const page = action.payload.activePage;
      return getState(page, state, action.payload.newState);
    },
    setDatas: (state: IAdminReducerDto, action: PayloadAction<{ activePage: string; datas: IApiDto[] }>) => {
      const page = action.payload.activePage;
      const pageState = getPageState(page, state);
      pageState.datas = action.payload.datas;
      return getState(page, state, pageState);
    },
    setCount: (state: IAdminReducerDto, action: PayloadAction<{ activePage: string; count: number }>) => {
      const page = action.payload.activePage;
      const pageState = getPageState(page, state);
      pageState.count = action.payload.count;
      return getState(page, state, pageState);
    },
    setData: (state: IAdminReducerDto, action: PayloadAction<{ activePage: string; data: IApiDto }>) => {
      const page = action.payload.activePage;
      const pageState = getPageState(page, state);
      pageState.data = action.payload.data;
      return getState(page, state, pageState);
    },
    setFilter: (state: IAdminReducerDto, action: PayloadAction<{ activePage: string; filter: IAdminFilterDto }>) => {
      const page = action.payload.activePage;
      const pageState = getPageState(page, state);
      pageState.filter = action.payload.filter;
      pageState.table.page = 0;
      return getState(page, state, pageState);
    },
    setPage: (state: IAdminReducerDto, action: PayloadAction<{ activePage: string; table: IAdminTableDto }>) => {
      const page = action.payload.activePage;
      const pageState = getPageState(page, state);
      pageState.table = action.payload.table;
      return getState(page, state, pageState);
    },
  },
});

export const AdminAction = { ...AdminReducer.actions };
export const AdminReducers = AdminReducer.reducer;
