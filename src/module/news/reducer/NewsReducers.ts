import { createSlice } from '@reduxjs/toolkit';
import { DefaultState, ReducerCrudState, ReducersActions } from '../../../store/reducer/BaseReducer';
import { INewsDto } from '../dto/NewsDto';

export interface NewsReducerState extends ReducerCrudState {
  datas: INewsDto[];
  data: INewsDto[];
}

const initialState: NewsReducerState = {
  ...DefaultState,
};

export const NewsReducer = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    ...ReducersActions,
  },
});
export const NewsAction = { ...NewsReducer.actions };
export const NewsReducers = NewsReducer.reducer;
