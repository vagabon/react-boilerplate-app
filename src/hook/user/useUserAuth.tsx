import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { LoginAction } from '../../module/auth/reducer/AuthReducers';
import AuthService from '../../module/auth/service/AuthService';
import { useAppDispatch } from '../../store/Store';

export const useUserAuth = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();

  const handleLogout = useCallback(() => {
    AuthService.logout();
    dispatch(LoginAction.setLoginError());
    navigate('');
  }, [navigate, dispatch]);

  return { handleLogout };
};
