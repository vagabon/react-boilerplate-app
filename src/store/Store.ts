import { configureStore } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import AuthReducers from '../module/auth/reducer/AuthReducers';
import NewsReducers from '../module/news/reducer/NewsReducers';
import CommonReducers from '../reducer/common/CommonReducer';

const reducers = combineReducers({
  common: CommonReducers,
  auth: AuthReducers,
  news: NewsReducers,
});

const store: EnhancedStore = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
