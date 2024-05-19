import { useCallback, useEffect, useState } from 'react';
import { useAppResize } from '../../app/resize/hook/useAppResize';

const drawerWidth = 240;

export const useAppTheme = () => {
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
  }, [windowSize.width]);

  const handleDrawerOpen = useCallback(
    (oldOpen: boolean) => () => {
      setOpenDrawer(!oldOpen);
    },
    [],
  );

  return {
    drawerWidth,
    openDrawer,
    variantDrawer,
    showOpenDrawer,
    handleDrawerOpen,
  };
};
