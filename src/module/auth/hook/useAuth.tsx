import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { ICurrentUserDto } from '../../../api/dto/current-user/CurrentUserDto';
import { AppStorageUtils } from '../../../app/storage/utils/AppStorageUtils';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { IUserDto } from '../../user/user/dto/UserDto';
import { LoginAction } from '../reducer/AuthReducers';
import { AuthService } from '../service/AuthService';

const URL_LOGIN_REDIRECT = '/profile';

export const useAuth = (apiUrl: string) => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);

  const handleLogin = useCallback(
    (data: IUserDto) => {
      AuthService.login(apiUrl, data.username as string, data.password as string).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data as ICurrentUserDto<IUserDto>));
        AppStorageUtils.setCurrentUser(data as ICurrentUserDto<IUserDto>);
        navigate?.(URL_LOGIN_REDIRECT);
      });
    },
    [apiUrl, dispatch, navigate],
  );

  const handleGoogleLogin = useCallback(
    (token: string) => {
      AuthService.googleConnect(apiUrl, token).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data as ICurrentUserDto<IUserDto>));
        AppStorageUtils.setCurrentUser(data as ICurrentUserDto<IUserDto>);
        navigate?.(URL_LOGIN_REDIRECT);
      });
    },
    [apiUrl, dispatch, navigate],
  );

  const handleFacebookLogin = useCallback(
    (token: string) => {
      AuthService.facebookConnect(apiUrl, token).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data as ICurrentUserDto<IUserDto>));
        AppStorageUtils.setCurrentUser(data as ICurrentUserDto<IUserDto>);
        navigate?.(URL_LOGIN_REDIRECT);
      });
    },
    [apiUrl, dispatch, navigate],
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
        navigate?.(url, { replace: true });
      }
    },
    [isLoggedIn, navigate],
  );

  return {
    isLoggedIn,
    handleLogin,
    updateLocalStorage,
    handleGoogleLogin,
    handleFacebookLogin,
    redirectIfLogged,
  };
};
