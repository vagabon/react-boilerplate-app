import { AxiosError } from 'axios';
import { useCallback, useRef, useState } from 'react';
import { useAppMessage } from '../../app/message/hook/useAppMessage';
import { ApiService } from '../service/ApiService';

export const useApiService = <T>(apiUrl: string) => {
  const { setMessage } = useAppMessage();
  const [firstRender, setFirstRender] = useState(false);

  const isLoad = useRef(false);
  const isLoadPost = useRef(false);
  const isLoadPut = useRef(false);
  const isLoadDelete = useRef(false);

  const httpGet = useCallback(
    (url: string, callback?: (data: T) => void, callbackError?: (data?: AxiosError) => void) => {
      if (!isLoad.current) {
        isLoad.current = true;
        ApiService.get<T>(apiUrl, url)
          .then((data) => {
            setFirstRender(true);
            isLoad.current = false;
            callback?.(data);
          })
          .catch((error) => {
            setFirstRender(true);
            isLoad.current = false;
            callbackError?.(error);
          });
      }
    },
    [apiUrl],
  );

  const httpPost = useCallback(
    (url: string, data: T, callback?: (data: T) => void, callbackError?: (data: AxiosError) => void) => {
      if (!isLoadPost.current) {
        isLoadPost.current = true;
        ApiService.post<T>(apiUrl, url, data)
          .then((data) => {
            setFirstRender(true);
            isLoadPost.current = false;
            callback?.(data);
          })
          .catch((error) => {
            setFirstRender(true);
            isLoadPost.current = false;
            callbackError?.(error);
          });
      }
    },
    [apiUrl],
  );

  const httpPut = useCallback(
    (url: string, data: T, callback?: (data: T) => void, callbackError?: (data: AxiosError) => void) => {
      if (!isLoadPut.current) {
        isLoadPut.current = true;
        ApiService.put<T>(apiUrl, url, data)
          .then((data) => {
            setFirstRender(true);
            isLoadPut.current = false;
            callback?.(data);
          })
          .catch((error) => {
            setFirstRender(true);
            isLoadPut.current = false;
            callbackError?.(error);
          });
      }
    },
    [apiUrl],
  );

  const deleteById = useCallback(
    (url: string, locale: string, callback?: (data: T) => void, callbackError?: (data: AxiosError) => void) => {
      if (!isLoadDelete.current) {
        isLoadDelete.current = true;
        ApiService.delete<T>(apiUrl, url)
          .then((data) => {
            setFirstRender(true);
            isLoadDelete.current = false;
            setMessage(locale + ':DELETE_OK', 'success');
            callback?.(data);
          })
          .catch((error) => {
            setFirstRender(true);
            isLoadDelete.current = false;
            callbackError?.(error);
          });
      }
    },
    [apiUrl, setMessage],
  );

  return { firstRender, httpGet, httpPost, httpPut, deleteById };
};
