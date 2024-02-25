import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md';
import { IPathDto } from '../../dto/path/PathDto';

export type MessageType = 'error' | 'success' | 'info' | 'warning';

export interface IMessageState {
  id: string;
  message: string;
  type: MessageType;
}

type ScrollsType = { pathname: string; position: number };

export interface IApiState {
  message: IMessageState;
  loading: boolean;
  history: IPathDto[];
  scrolls: ScrollsType[];
  modeTheme: string;
}

const SUCCESS: MessageType = 'success';
const HOME: string = '/';

const initialState: IApiState = {
  message: { id: '', message: '', type: SUCCESS },
  loading: false,
  history: [],
  scrolls: [],
  modeTheme: '',
};

export const CommonReducer = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setMessage: (state: IApiState, action: PayloadAction<IMessageState>) => {
      return {
        ...state,
        message: action.payload,
      };
    },
    clearMessage: (state: IApiState) => {
      return {
        ...state,
        message: { id: '', message: '', type: SUCCESS },
      };
    },
    setLoading: (state: IApiState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setHistory: (state: IApiState, action: PayloadAction<IPathDto[]>) => {
      return {
        ...state,
        history: action.payload,
      };
    },
    addHistory: (state: IApiState, action: PayloadAction<IPathDto>) => {
      let history: IPathDto[] = [...state.history];
      const pathname = action.payload.link;

      const index = history.findIndex((historyItem) => historyItem.link === pathname);
      if (index === -1) {
        if (history.length === 0 && pathname !== HOME) {
          history.push({ id: UuidUtils.createUUID(), title: 'Accueil', link: HOME });
        }
        history.push(action.payload);
      } else {
        history = history.slice(0, index + 1);
      }
      return {
        ...state,
        history,
      };
    },
    sliceHistoryOnce: (state: IApiState) => {
      const history = [...state.history];
      history.pop();
      return {
        ...state,
        history: history,
      };
    },
    sliceHistory: (state: IApiState) => {
      const history = [...state.history];
      history.pop();
      history.pop();
      return {
        ...state,
        history: history,
      };
    },
    setScrools: (state: IApiState, action: PayloadAction<ScrollsType>) => {
      return {
        ...state,
        scrolls: {
          ...state.scrolls,
          [action.payload.pathname]: action.payload.position,
        },
      };
    },
    setModeTheme: (state: IApiState, action: PayloadAction<string>) => {
      return {
        ...state,
        modeTheme: action?.payload,
      };
    },
  },
});
export const CommonAction = { ...CommonReducer.actions };
const CommonReducers = CommonReducer.reducer;
export default CommonReducers;
