import { IApiDto, ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback } from 'react';

export const useCustomList = (callback?: (data: IApiDto) => void) => {
  const handleClick = useCallback(
    (data: IApiDto) => () => {
      callback?.(data);
    },
    [callback],
  );

  const handleClickChecbox = useCallback(
    (id: ID, checked: boolean, callback?: (id: ID, checked: boolean) => void) => () => {
      callback?.(id, checked);
    },
    [],
  );

  return { handleClick, handleClickChecbox };
};
