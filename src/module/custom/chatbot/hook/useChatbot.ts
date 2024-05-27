import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../store/Store';
import { CommonAction } from '../../../../store/reducer/common/CommonReducers';

export const useChatbot = () => {
  const dispatch = useAppDispatch();
  const chatbot = useAppSelector((state) => state.common.chatbot, shallowEqual);

  const handleClick = useCallback(
    (url: string, show: boolean, handleClose?: () => void) => () => {
      dispatch(CommonAction.setChatbot({ selected: url, show }));
      handleClose?.();
    },
    [dispatch],
  );

  return { chatbot, handleClick };
};
