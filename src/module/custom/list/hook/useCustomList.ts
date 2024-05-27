import { IApiDto, ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback, useEffect, useState } from 'react';
import { IMessageState } from '../../../../store/reducer/common/CommonReducers';

export const useCustomList = (
  message: IMessageState,
  callback?: (data: IApiDto) => void,
  callbackCheckbox?: (id: ID, checked: boolean) => void,
  isCheckboxColor?: boolean,
) => {
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    if (message?.message !== '') {
      setDisabled(false);
    }
  }, [message]);

  const handleClick = useCallback(
    (data: IApiDto) => () => {
      callback?.(data);
    },
    [callback],
  );

  const handleClickChecbox = useCallback(
    (id: ID, checked: boolean, callback?: (id: ID, checked: boolean) => void) => () => {
      setDisabled(true);
      callback?.(id, checked);
    },
    [],
  );

  const getIconColor = useCallback(
    (checked?: boolean) => {
      if (!callbackCheckbox) {
        return 'info';
      } else {
        return checked ? 'success' : 'error';
      }
    },
    [callbackCheckbox],
  );

  const getTextColor = useCallback(
    (checked?: boolean) => {
      return checked && isCheckboxColor ? 'success' : '';
    },
    [isCheckboxColor],
  );

  return { disabled, handleClick, handleClickChecbox, getIconColor, getTextColor };
};
