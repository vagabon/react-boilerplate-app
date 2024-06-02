import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';

export interface IPathDto {
  id: string;
  title: string;
  link: string;
  clickable?: boolean;
}

export type MessageType = 'error' | 'success' | 'info' | 'warning';

export interface IMessageState {
  id: string;
  message: string;
  type: MessageType;
}

export type ScrollsType = { pathname: string; position: number };

export type DrawerType = { open: boolean; variant: string; force: boolean };

export type ChatbotType = {
  show: boolean;
  selected: string;
};

export interface IApiState {
  message: IMessageState;
  loading: boolean;
  history: IPathDto[];
  scrolls: ScrollsType[];
  drawer: DrawerType;
  chatbot: ChatbotType;
}

const SUCCESS: MessageType = 'success';
const HOME: string = '/';

const initialState: IApiState = {
  message: { id: '', message: '', type: SUCCESS },
  loading: false,
  history: [],
  scrolls: [],
  drawer: { open: false, variant: 'temporary', force: false },
  chatbot: { show: false, selected: '' },
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
      let scrolls = [...state.scrolls];
      if (scrolls.find((scroll) => scroll.pathname === action.payload.pathname)) {
        scrolls = scrolls.map((scroll) =>
          scroll.pathname === action.payload.pathname
            ? { pathname: action.payload.pathname, position: action.payload.position }
            : scroll,
        );
      } else {
        scrolls.push({ pathname: action.payload.pathname, position: action.payload.position });
      }
      return {
        ...state,
        scrolls,
      };
    },
    setChatbot: (state: IApiState, action: PayloadAction<ChatbotType>) => {
      return {
        ...state,
        chatbot: action?.payload,
      };
    },
    setDrawer: (state: IApiState, action: PayloadAction<DrawerType>) => {
      return {
        ...state,
        drawer: action?.payload,
      };
    },
  },
});
export const CommonAction = { ...CommonReducer.actions };
export const CommonReducers = CommonReducer.reducer;
