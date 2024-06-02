import { useCallback } from 'react';
import { useAppDispatch } from '../../store/Store';
import { CommonAction } from '../../store/reducer/common/CommonReducers';

export const DRAWER_WIDTH = 240;

export const useTemplateDrawer = () => {
  const dispatch = useAppDispatch();

  const handleSwitchDrawer = useCallback(
    (open: boolean) => () => {
      dispatch(
        CommonAction.setDrawer({
          open: !open,
          variant: 'temporary',
          force: false,
        }),
      );
    },
    [dispatch],
  );

  return {
    handleSwitchDrawer,
  };
};
