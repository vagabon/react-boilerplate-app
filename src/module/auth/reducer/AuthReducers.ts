import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentUserDto } from '../../../dto/current-user/CurrentUserDto';
import { StorageUtils } from '../../../utils/storage/StorageUtils';
import { IUserDto } from '../../user/user/dto/UserDto';

const user: ICurrentUserDto<IUserDto> | null = StorageUtils.getCurrentUser();

export interface AuthReducerState {
  isLoggedIn: boolean;
  user: ICurrentUserDto<IUserDto> | null;
}

const initialState: AuthReducerState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export const AuthReducer = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setLoginSuccess: (state: AuthReducerState, action: PayloadAction<ICurrentUserDto<IUserDto>>) => ({
      ...state,
      isLoggedIn: true,
      user: action.payload,
    }),
    setLoginError: (state: AuthReducerState) => ({
      ...state,
      isLoggedIn: false,
      user: null,
    }),
  },
});

export const LoginAction = { ...AuthReducer.actions };
const AuthReducers = AuthReducer.reducer;
export default AuthReducers;
