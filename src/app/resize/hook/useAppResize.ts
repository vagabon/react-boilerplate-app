import { useCallback, useEffect, useState } from 'react';

export const useAppResize = () => {
  const [windowSize, setWindowSize] = useState<{ width?: number; height?: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return { windowSize };
};
