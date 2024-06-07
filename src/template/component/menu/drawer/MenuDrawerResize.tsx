import { memo, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppResize } from '../../../../app/resize/hook/useAppResize';
import { useAppDispatch, useAppSelector } from '../../../../store/Store';
import { CommonAction } from '../../../../store/reducer/common/CommonReducers';

export const MAX_DRAWER_WIDTH = 1024;

export const MenuDrawerResize: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);
  const { windowSize } = useAppResize();

  useEffect(() => {
    if (windowSize.width && windowSize.width > MAX_DRAWER_WIDTH && isLoggedIn) {
      dispatch(
        CommonAction.setDrawer({
          open: true,
          variant: 'permanent',
          force: true,
        }),
      );
    } else {
      dispatch(
        CommonAction.setDrawer({
          open: false,
          variant: 'temporary',
          force: false,
        }),
      );
    }
  }, [dispatch, windowSize.width, isLoggedIn]);

  return <></>;
});
