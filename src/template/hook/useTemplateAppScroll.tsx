import { useCallback, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { ScrollsType } from '../../reducer/common/CommonReducers';
import { useAppSelector } from '../../store/Store';

export const useTemplateAppScroll = () => {
  const scrolls = useAppSelector((state) => state.common.scrolls, shallowEqual);
  const lastScrollPagthName = useRef('');

  const getScrollPage = useCallback(
    (pathname: string) => {
      if (lastScrollPagthName.current === pathname) {
        return;
      }
      lastScrollPagthName.current = pathname;
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

  return { getScrollPage };
};
