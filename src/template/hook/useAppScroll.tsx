import { MutableRefObject, useCallback } from 'react';
import { CommonAction, ScrollsType } from '../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';

export const useAppScroll = () => {
  const dispatch = useAppDispatch();
  const { scrolls } = useAppSelector((state) => state.common);

  const getScrollPage = useCallback(
    (pathname: string) => {
      const scroll = scrolls?.filter((scroll: ScrollsType) => scroll.pathname === pathname);
      const classes = document.getElementsByClassName('main-container');
      let find = false;
      if (classes?.length > 0 && scroll?.length > 0) {
        classes[0].scrollTo(0, scroll ? scroll[0].position : 0);
        find = true;
      }
      const classesInfinite = document.getElementsByClassName('infinite-container');
      if (classesInfinite?.length > 0 && scroll?.length > 0) {
        classesInfinite[0].scrollTo(0, scroll ? scroll[0].position : 0);
        find = true;
      }
      !find && document.getElementsByClassName('main-container')?.[0]?.scrollTo(0, 0);
    },
    [scrolls],
  );

  const handleScroll = useCallback(
    (mainContainer: MutableRefObject<HTMLDivElement | null>, pathname: string) => () => {
      const scrollTop = mainContainer?.current?.scrollTop ?? 0;
      dispatch(CommonAction.setScrools({ pathname: pathname, position: scrollTop }));
    },
    [dispatch],
  );

  return { handleScroll, getScrollPage };
};
