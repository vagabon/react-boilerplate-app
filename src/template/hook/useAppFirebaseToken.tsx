import { useEffect } from 'react';
import { ApiService } from '../../api/service/ApiService';
import { useAppSelector } from '../../store/Store';

export const useAppFirebaseToken = (apiUrl: string, generateToken?: () => Promise<string | undefined>) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (generateToken) {
      const fireToken = localStorage.getItem('fire_token');
      currentUser?.user?.id &&
        generateToken().then((token) => {
          (!fireToken || fireToken !== token) &&
            ApiService.put(apiUrl, '/notification/token/user', { userId: currentUser?.user?.id, token: token }).then(
              (data) => {
                data?.token && localStorage.setItem('fire_token', data?.token);
              },
            );
        });
    }
  }, [apiUrl, generateToken, currentUser?.user?.id]);
  return {};
};
