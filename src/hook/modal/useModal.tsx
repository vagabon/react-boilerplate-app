import { ID } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useState } from 'react';

export interface IModalReturnProps {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleYes: (id: ID, callback?: (id: ID) => void) => () => void;
}

export const useModal = (): IModalReturnProps => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleYes = useCallback(
    (id: ID, callback?: (id: ID) => void) => () => {
      closeModal();
      callback?.(id);
    },
    [closeModal],
  );

  return { open, openModal, closeModal, handleYes };
};
