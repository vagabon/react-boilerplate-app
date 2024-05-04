import { useCallback } from 'react';
import { CommonAction } from '../../../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../../../store/Store';

export const useChatbot = () => {
  const dispatch = useAppDispatch();
  const { chatbot } = useAppSelector((state) => state.common);

  const handleClick = useCallback(
    (url: string, show: boolean, handleClose?: () => void) => () => {
      dispatch(CommonAction.setChatbot({ selected: url, show }));
      handleClose?.();
    },
    [dispatch],
  );

  return { chatbot, handleClick };
};
