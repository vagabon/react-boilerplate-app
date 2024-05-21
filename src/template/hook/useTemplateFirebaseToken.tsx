import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { ApiService } from '../../api/service/ApiService';
import { useAppSelector } from '../../store/Store';

export const useTemplateFirebaseToken = (apiUrl: string, generateToken?: () => Promise<string | undefined>) => {
  const userId = useAppSelector((state) => state.auth?.user?.user?.id, shallowEqual);

  useEffect(() => {
    if (generateToken) {
      const fireToken = localStorage.getItem('fire_token');
      userId &&
        generateToken().then((token) => {
          (!fireToken || fireToken !== token) &&
            ApiService.put(apiUrl, '/notification/token/user', { userId: userId, token: token }).then((data) => {
              data?.token && localStorage.setItem('fire_token', data?.token);
            });
        });
    }
  }, [apiUrl, generateToken, userId]);
  return {};
};
