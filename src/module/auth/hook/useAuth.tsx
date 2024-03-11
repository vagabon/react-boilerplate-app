import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { ICurrentUserDto } from '../../../dto/current-user/CurrentUserDto';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { StorageUtils } from '../../../utils/storage/StorageUtils';
import { IUserDto } from '../../user/user/dto/UserDto';
import { LoginAction } from '../reducer/AuthReducers';
import AuthService from '../service/AuthService';

const URL_LOGIN_REDIRECT = '/profile';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const handleLogin = useCallback(
    (data: IUserDto) => {
      AuthService.login(data.username as string, data.password as string).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data as ICurrentUserDto<IUserDto>));
        StorageUtils.setCurrentUser(data as ICurrentUserDto<IUserDto>);
        navigate(URL_LOGIN_REDIRECT);
      });
    },
    [dispatch, navigate],
  );

  const handleGoogleLogin = useCallback(
    (token: string) => {
      AuthService.googleConnect(token).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data as ICurrentUserDto<IUserDto>));
        StorageUtils.setCurrentUser(data as ICurrentUserDto<IUserDto>);
        navigate(URL_LOGIN_REDIRECT);
      });
    },
    [dispatch, navigate],
  );

  const handleFacebookLogin = useCallback(
    (token: string) => {
      AuthService.facebookConnect(token).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data as ICurrentUserDto<IUserDto>));
        StorageUtils.setCurrentUser(data as ICurrentUserDto<IUserDto>);
        navigate(URL_LOGIN_REDIRECT);
      });
    },
    [dispatch, navigate],
  );

  const updateLocalStorage = useCallback(
    (data: ICurrentUserDto<IUserDto>) => {
      AuthService.updateLocalStorage(data);
      dispatch(LoginAction.setLoginSuccess(data));
    },
    [dispatch],
  );

  const redirectIfLogged = useCallback(
    (url: string = URL_LOGIN_REDIRECT) => {
      if (isLoggedIn) {
        navigate(url);
      }
    },
    [isLoggedIn, navigate],
  );

  return {
    isLoggedIn,
    user: user?.user,
    handleLogin,
    updateLocalStorage,
    handleGoogleLogin,
    handleFacebookLogin,
    redirectIfLogged,
  };
};
