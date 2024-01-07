import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md';
import { IPathDto } from '../../dto/path/PathDto';

interface MessageButton {
  label?: string;
  url?: string;
}
export type MessageType = 'error' | 'success' | 'info' | 'warning';

interface ApiMessageState {
  message: string;
  type: MessageType;
  button?: MessageButton;
}

type ScrollsType = { pathname: string; position: number };

export interface ApiState extends ApiMessageState {
  loading: boolean;
  history: IPathDto[];
  scrolls: ScrollsType[];
}

const SUCCESS: MessageType = 'success';
const HOME: string = '/home';

const initialState: ApiState = { message: '', type: SUCCESS, loading: false, history: [], scrolls: [] };

export const CommonReducer = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setMessage: (state: ApiState, action: PayloadAction<ApiMessageState>) => {
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        button: undefined,
      };
    },
    setMessageButton: (state: ApiState, action: PayloadAction<MessageButton>) => {
      const label: string = action.payload.label ?? 'Retour';
      const url: string =
        action.payload.url ?? (state.history.length > 1 ? state.history[state.history.length - 2].link : '/home');
      return {
        ...state,
        button: { label, url },
      };
    },
    clearMessage: (state: ApiState) => {
      return {
        ...state,
        message: '',
        button: undefined,
      };
    },
    setLoading: (state: ApiState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setHistory: (state: ApiState, action: PayloadAction<IPathDto[]>) => {
      return {
        ...state,
        history: action.payload,
      };
    },
    addHistory: (state: ApiState, action: PayloadAction<IPathDto>) => {
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
    sliceHistoryOnce: (state: ApiState) => {
      const history = [...state.history];
      history.pop();
      return {
        ...state,
        history: history,
      };
    },
    sliceHistory: (state: ApiState) => {
      const history = [...state.history];
      history.pop();
      history.pop();
      return {
        ...state,
        history: history,
      };
    },
    setScrools: (state: ApiState, action: PayloadAction<ScrollsType>) => {
      return {
        ...state,
        scrolls: {
          ...state.scrolls,
          [action.payload.pathname]: action.payload.position,
        },
      };
    },
  },
});
export const CommonAction = { ...CommonReducer.actions };
const CommonReducers = CommonReducer.reducer;
export default CommonReducers;
