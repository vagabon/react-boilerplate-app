import { SnackbarKey, closeSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useAppResize } from '../../app/resize/hook/useAppResize';

export const useAppTheme = () => {
  const drawerWidth = 240;

  const { windowSize } = useAppResize();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [variantDrawer, setVariantDrawer] = useState<'permanent' | 'persistent' | 'temporary'>('temporary');
  const [showOpenDrawer, setShowOpenDrawer] = useState(false);

  useEffect(() => {
    if (windowSize.width && windowSize.width > 800) {
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

  return { drawerWidth, openDrawer, variantDrawer, showOpenDrawer, handleDrawerOpen, handleCloseSnackbar };
};
