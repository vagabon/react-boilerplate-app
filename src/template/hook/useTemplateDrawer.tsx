import { useCallback } from 'react';
import { useAppDispatch } from '../../store/Store';
import { CommonAction } from '../../store/reducer/common/CommonReducers';

export const DRAWER_WIDTH = 240;

export const useTemplateDrawer = () => {
  const dispatch = useAppDispatch();

  const handleSwitchDrawer = useCallback(
    (open: boolean) => () => {
      dispatch(CommonAction.setDrawerOpen(!open));
    },
    [dispatch],
  );

  return {
    handleSwitchDrawer,
  };
};
