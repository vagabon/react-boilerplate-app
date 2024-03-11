import { SnackbarKey, closeSnackbar } from 'notistack';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useAppResize } from '../../app/resize/hook/useAppResize';
import { CommonAction, ScrollsType } from '../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';

const drawerWidth = 240;

export const useAppTheme = () => {
  const dispatch = useAppDispatch();
  const { scrolls } = useAppSelector((state) => state.common);
  const { windowSize } = useAppResize();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [variantDrawer, setVariantDrawer] = useState<'permanent' | 'persistent' | 'temporary'>('temporary');
  const [showOpenDrawer, setShowOpenDrawer] = useState(false);

  useEffect(() => {
    if (windowSize.width && windowSize.width > 1000) {
      setOpenDrawer(true);
      setVariantDrawer('permanent');
      setShowOpenDrawer(false);
    } else {
      setOpenDrawer(false);
      setVariantDrawer('temporary');
      setShowOpenDrawer(true);
    }
  }, [windowSize]);

  const handleDrawerOpen = useCallback(
    (oldOpen: boolean) => () => {
      setOpenDrawer(!oldOpen);
    },
    [],
  );

  const handleCloseSnackbar = useCallback(
    (snackbarId: SnackbarKey) => <button onClick={() => closeSnackbar(snackbarId)}>X</button>,
    [],
  );

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

  return {
    drawerWidth,
    openDrawer,
    variantDrawer,
    showOpenDrawer,
    handleDrawerOpen,
    handleCloseSnackbar,
    getScrollPage,
    handleScroll,
  };
};
