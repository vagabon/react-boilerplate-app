import { useCallback } from 'react';
import { CommonAction } from '../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';

export const useMessage = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.common);

  const setMessage = useCallback(
    (message: string, type: 'success' | 'error' = 'error') => {
      dispatch(CommonAction.setMessage({ message, type }));
    },
    [dispatch],
  );

  const setMessageButton = useCallback(
    (url?: string, label?: string) => {
      dispatch(CommonAction.setMessageButton({ url, label }));
    },
    [dispatch],
  );

  const clearMessage = useCallback(() => {
    dispatch(CommonAction.clearMessage());
  }, [dispatch]);

  return { message, setMessage, setMessageButton, clearMessage };
};
