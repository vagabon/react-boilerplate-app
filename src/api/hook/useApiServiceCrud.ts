import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useRef } from 'react';
import { useMessage } from '../../hook/message/useMessage';
import { ApiCrudService } from '../service/crud/ApiCrudService';

export const useApiServiceCrud = () => {
  const { setMessage } = useMessage();
  const isLoad = useRef(false);

  const createOrUpdate = <IApiDto>useCallback(
    (url: string, data: IApiDto, locale: string, callback: (data: IApiDto) => void = () => {}) => {
      if (!isLoad.current) {
        isLoad.current = true;
        const entityIdBeforePersist = data.id;
        ApiCrudService.createOrUpdate<IApiDto>(url, data)
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
    [setMessage],
  );

  return { createOrUpdate };
};
