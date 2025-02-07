import { EnhancedStore } from '@reduxjs/toolkit';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AppStorageUtils } from '../../app/storage/utils/AppStorageUtils';
import { LoginAction } from '../../module/auth/reducer/AuthReducers';
import { CommonAction } from '../../store/reducer/common/CommonReducers';

export const AxiosInterceptor = <U>(
  store: EnhancedStore,
  apiUrl: string,
  loginEnpoint: string,
  refreshTokenEndPoint: string,
) => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      store.dispatch(CommonAction.setLoading(true));
      store.dispatch(CommonAction.clearMessage());

      const jwt = store.getState()?.auth?.user?.jwt;
      if (
        jwt &&
        config.headers &&
        !config.url?.includes('/auth/') &&
        !config.url?.includes(loginEnpoint) &&
        !config.url?.includes(refreshTokenEndPoint) &&
        !config.url?.includes('/ping')
      ) {
        config.headers = { ...config.headers, ['Authorization' as string]: 'Bearer ' + jwt } as AxiosHeaders;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error(error);
      store.dispatch(CommonAction.setLoading(false));
      return error;
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      store.dispatch(CommonAction.setLoading(false));
      let data;
      try {
        data = JSON.parse(response.config.data);
      } catch (e) {
        data = response.config.data;
      }
      console.log(response.config.url, data, response.status, response.data);
      return response;
    },
    async (error: AxiosError<U>) => {
      store.dispatch(CommonAction.setLoading(false));
      const originalRequest: InternalAxiosRequestConfig | undefined = error.config;

      const message: string = ((error.response?.data && error.response?.data['debugMessage' as keyof U]) ||
        error.message ||
        JSON.stringify(error)) as string;

      if (
        error.response &&
        error.response.status === 401 &&
        originalRequest &&
        originalRequest.url !== apiUrl + loginEnpoint &&
        !originalRequest['_retry' as keyof InternalAxiosRequestConfig]
      ) {
        originalRequest['_retry' as keyof InternalAxiosRequestConfig] = 'true';

        const jwtRefresh = store.getState()?.auth?.user?.jwtRefresh;
        if (jwtRefresh) {
          axios.defaults.headers.common['Authorization'] = '';
          const data = await axios.post(apiUrl + refreshTokenEndPoint, {
            refreshToken: jwtRefresh,
          });
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.jwt;
          store.dispatch(LoginAction.setLoginSuccess(data.data));
          AppStorageUtils.setCurrentUser(data.data);
          return axios(originalRequest);
        }
      } else if (error.response && error.response.status === 401) {
        store.dispatch(LoginAction.setLoginError());
        window.location.href = loginEnpoint;
      } else if (
        message !== 'Error invoking subclass method' &&
        !message.includes('Insufficient downstream requests to emit item')
      ) {
        store.dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message, type: 'error' }));
        return error;
      }
    },
  );
};
