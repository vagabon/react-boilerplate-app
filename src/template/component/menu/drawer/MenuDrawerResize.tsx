import { memo, useEffect } from 'react';
import { useAppResize } from '../../../../app/resize/hook/useAppResize';
import { useAppDispatch } from '../../../../store/Store';
import { CommonAction } from '../../../../store/reducer/common/CommonReducers';

export const MAX_DRAWER_WIDTH = 1024;

export const MenuDrawerResize: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { windowSize } = useAppResize();

  useEffect(() => {
    if (windowSize.width && windowSize.width > MAX_DRAWER_WIDTH) {
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
  }, [dispatch, windowSize.width]);

  return <></>;
});
