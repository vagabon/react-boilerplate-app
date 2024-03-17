import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultState, ReducerCrudState, ReducersActions } from '../../../reducer/BaseReducer';
import { INotificationDto } from '../dto/NotificationDto';

export interface INotificationReducerState extends ReducerCrudState {
  datas: INotificationDto[];
  data: INotificationDto[];
  nbNotification?: number;
}

const initialState: INotificationReducerState = {
  ...DefaultState,
  nbNotification: undefined,
};

export const NotificationReducer = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    ...ReducersActions,
    replaceItem: (state: INotificationReducerState, action: PayloadAction<INotificationDto>) => {
      let items = [...(state?.datas ?? [])];
      items = items.map((item) => (item.id === action?.payload?.id ? action?.payload : item));
      return {
        ...state,
        datas: items,
      };
    },
    readAll: (state: INotificationReducerState) => {
      let items = [...(state?.datas ?? [])];
      items = items?.map((item) => {
        return { ...item, read: true };
      });
      return {
        ...state,
        datas: items,
      };
    },
    setNbNotification: (state: INotificationReducerState, action: PayloadAction<number>) => {
      return {
        ...state,
        nbNotification: action?.payload,
      };
    },
    addNbNotification: (state: INotificationReducerState, action: PayloadAction<number>) => {
      const nbNotification = state?.nbNotification ?? 0;
      return {
        ...state,
        nbNotification: nbNotification > 0 ? nbNotification + action?.payload : 0,
      };
    },
  },
});
export const NotificationAction = { ...NotificationReducer.actions };
const NotificationReducers = NotificationReducer.reducer;
export default NotificationReducers;
