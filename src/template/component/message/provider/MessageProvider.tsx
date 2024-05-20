import { SnackbarKey, SnackbarProvider, closeSnackbar } from 'notistack';
import { useCallback } from 'react';
import { ShowMessage } from '../ShowMessage';

export const MessageProvider: React.FC = () => {
  const handleClose = useCallback(
    (snackbarId: SnackbarKey) => () => {
      closeSnackbar(snackbarId);
    },
    [],
  );
  const handleCloseSnackbar = useCallback(
    (snackbarId: SnackbarKey) => <button onClick={handleClose(snackbarId)}>X</button>,
    [handleClose],
  );

  return (
    <SnackbarProvider maxSnack={5} action={handleCloseSnackbar}>
      <ShowMessage />
    </SnackbarProvider>
  );
};
