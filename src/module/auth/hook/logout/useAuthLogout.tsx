import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../../store/Store';
import { LoginAction } from '../../reducer/AuthReducers';
import { AuthService } from '../../service/AuthService';

export const useAuthLogout = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();

  const handleLogout = useCallback(() => {
    AuthService.logout();
    dispatch(LoginAction.setLoginError());
    navigate('/');
  }, [navigate, dispatch]);

  return { handleLogout };
};
