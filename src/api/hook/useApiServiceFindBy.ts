import { useCallback, useRef } from 'react';
import { IPageableDto } from '../../dto/pageable/PageableDto';
import { ApiService } from '../service/ApiService';

export const useApiServiceFindBy = <T>(url: string, champs?: string, max?: number) => {
  const isLoad = useRef(false);
  const stopLoad = useRef(false);

  const fetchBy = useCallback(
    (
      values: string,
      page: number,
      orderBy: string = 'id',
      orderByAsc: string = 'desc',
      callback: (data: IPageableDto<T[]>) => void = () => {},
    ) => {
      if (!isLoad.current) {
        isLoad.current = true;
        !stopLoad.current &&
          ApiService.findBy<IPageableDto<T[]>>(url, champs as string, values, page, max as number, orderBy, orderByAsc)
            .then((data) => {
              isLoad.current = false;
              if (data?.content?.length === 0 && page > 0) {
                stopLoad.current = true;
              } else {
                callback(data);
                stopLoad.current = false;
              }
            })
            .catch(() => {
              isLoad.current = false;
            });
      }
    },
    [url, champs, max],
  );

  return { fetchBy };
};
