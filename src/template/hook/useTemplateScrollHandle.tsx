import { MutableRefObject, useCallback } from 'react';
import { CommonAction } from '../../reducer/common/CommonReducers';
import { useAppDispatch } from '../../store/Store';

export const useTemplateScrollHandle = () => {
  const dispatch = useAppDispatch();

  const handleScroll = useCallback(
    (mainContainer: MutableRefObject<HTMLDivElement | null>, pathname: string) => () => {
      const scrollTop = mainContainer?.current?.scrollTop ?? 0;
      dispatch(CommonAction.setScrools({ pathname: pathname, position: scrollTop }));
    },
    [dispatch],
  );

  return { handleScroll };
};
