import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { CommonAction } from '../../reducer/common/CommonReducers';
import { useAppDispatch, useAppSelector } from '../../store/Store';

export const useMessage = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.common.message, shallowEqual);

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
