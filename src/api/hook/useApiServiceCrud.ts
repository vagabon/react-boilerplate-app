import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback, useRef } from 'react';
import { useMessage } from '../../hook/message/useMessage';
import { ApiCrudService } from '../service/crud/ApiCrudService';

export const useApiServiceCrud = <T extends IApiDto>(apiUrl: string) => {
  const { setMessage } = useMessage();
  const isLoad = useRef(false);

  const createOrUpdate = useCallback(
    (url: string, data: T, locale: string, callback: (data: T) => void = () => {}) => {
      if (!isLoad.current) {
        isLoad.current = true;
        const entityIdBeforePersist = data.id;
        ApiCrudService.createOrUpdate<T>(apiUrl, url, data)
          .then((data) => {
            isLoad.current = false;
            if (!entityIdBeforePersist) {
              setMessage(locale + ':CREATION_OK', 'success');
            } else {
              setMessage(locale + ':UPDATE_OK', 'success');
            }
            callback(data);
          })
          .catch(() => {
            isLoad.current = false;
          });
      }
    },
    [apiUrl, setMessage],
  );

  return { createOrUpdate };
};
