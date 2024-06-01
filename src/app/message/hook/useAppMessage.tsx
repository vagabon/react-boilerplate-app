import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../store/Store';
import { CommonAction } from '../../../store/reducer/common/CommonReducers';

export const useAppMessage = () => {
  const dispatch = useAppDispatch();

  const setMessage = useCallback(
    (message: string, type: 'success' | 'error' = 'error') => {
      const messageState = { id: UuidUtils.createUUID(), message, type };
      dispatch(CommonAction.setMessage(messageState));
    },
    [dispatch],
  );

  const clearMessage = useCallback(() => {
    dispatch(CommonAction.clearMessage());
  }, [dispatch]);

  return { setMessage, clearMessage };
};
