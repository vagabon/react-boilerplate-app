import { SnackbarProvider as NotistackSnackbarProvider, SnackbarKey, closeSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Snackbar } from '../Snackbar';

export const SnackbarProvider: React.FC = () => {
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
    <NotistackSnackbarProvider maxSnack={5} action={handleCloseSnackbar}>
      <Snackbar />
    </NotistackSnackbarProvider>
  );
};
