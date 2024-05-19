import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { ThemeContextProvider } from '@vagabond-inc/react-boilerplate-md/dist/theme/context/ThemeContext';
import { SnackbarKey, SnackbarProvider, closeSnackbar } from 'notistack';
import React, { PropsWithChildren, memo, useCallback } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppScrollToAnchor } from '../../../app/scrool/AppScrollToAnchor';
import { ShowMessage } from '../message/ShowMessage';

export interface IAppThemeProps extends PropsWithChildren {
  palette: JSONObject;
}

export const AppTheme: React.FC<IAppThemeProps> = memo(({ palette, children }) => {
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
    <HelmetProvider data-rh='true' data-react-helmet='true'>
      <AppScrollToAnchor />
      <ThemeContextProvider palette={palette}>
        <div className={'flex heigth100'}>{children}</div>
      </ThemeContextProvider>
      <SnackbarProvider maxSnack={5} action={handleCloseSnackbar}>
        <ShowMessage />
      </SnackbarProvider>
    </HelmetProvider>
  );
});
