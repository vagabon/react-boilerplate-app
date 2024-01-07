import { KeyboardEvent, useCallback } from 'react';

export const useHandleKey = () => {
  const handleAllKeyDown = useCallback(
    (callback: () => void) => (event: KeyboardEvent<HTMLDialogElement>) => {
      if (event.key === 'Escape') {
        callback();
      }
    },
    [],
  );

  return { handleAllKeyDown };
};
