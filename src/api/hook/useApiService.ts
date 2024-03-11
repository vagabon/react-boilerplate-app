import { AxiosError } from 'axios';
import { useCallback, useRef } from 'react';
import { useMessage } from '../../hook/message/useMessage';
import { ApiService } from '../service/ApiService';

export const useApiService = <T>() => {
  const { setMessage } = useMessage();
  const isLoad = useRef(false);
  const isLoadPost = useRef(false);
  const isLoadPut = useRef(false);
  const isLoadDelete = useRef(false);

  const httpGet = useCallback(
    (url: string, callback?: (data: T) => void, callbackError?: (data?: AxiosError) => void) => {
      if (!isLoad.current) {
        isLoad.current = true;
        ApiService.get<T>(url)
          .then((data) => {
            isLoad.current = false;
            callback?.(data);
          })
          .catch((error) => {
            isLoad.current = false;
            callbackError?.(error);
          });
      }
    },
    [],
  );

  const httpPost = useCallback(
    (url: string, data: T, callback?: (data: T) => void, callbackError?: (data: AxiosError) => void) => {
      if (!isLoadPost.current) {
        isLoadPost.current = true;
        ApiService.post<T>(url, data)
          .then((data) => {
            isLoadPost.current = false;
            callback?.(data);
          })
          .catch((error) => {
            isLoadPost.current = false;
            callbackError?.(error);
          });
      }
    },
    [],
  );

  const httpPut = useCallback(
    (url: string, data: T, callback?: (data: T) => void, callbackError?: (data: AxiosError) => void) => {
      if (!isLoadPut.current) {
        isLoadPut.current = true;
        ApiService.put<T>(url, data)
          .then((data) => {
            isLoadPut.current = false;
            callback?.(data);
          })
          .catch((error) => {
            isLoadPut.current = false;
            callbackError?.(error);
          });
      }
    },
    [],
  );

  const deleteById = useCallback(
    (url: string, locale: string, callback?: (data: T) => void, callbackError?: (data: AxiosError) => void) => {
      if (!isLoadDelete.current) {
        isLoadDelete.current = true;
        ApiService.delete<T>(url)
          .then((data) => {
            isLoadDelete.current = false;
            setMessage(locale + ':DELETE_OK', 'success');
            callback?.(data);
          })
          .catch((error) => {
            isLoadDelete.current = false;
            callbackError?.(error);
          });
      }
    },
    [setMessage],
  );

  return { httpGet, httpPost, httpPut, deleteById };
};
