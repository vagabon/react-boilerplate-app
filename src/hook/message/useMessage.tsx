import { UuidUtils } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { CommonAction } from '../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';

export const useMessage = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.common);

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

  return { message, setMessage, clearMessage };
};
