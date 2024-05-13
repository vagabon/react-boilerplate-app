import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdThemeProvider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/theme/MdThemeProvider';
import { ITheme, ModeType, useTheme } from '@vagabond-inc/react-boilerplate-md/dist/md/component/theme/useTheme';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { SnackbarKey, SnackbarProvider, closeSnackbar } from 'notistack';
import React, { memo, useCallback, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppScrollToAnchor } from '../../../app/scrool/AppScrollToAnchor';
import { CommonAction } from '../../../reducer/common/CommonReducers';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { ShowMessage } from '../message/ShowMessage';

export interface IFormThemeDto {
  mode: ModeType;
  theme: ITheme | undefined;
  switchTheme: (newMode: ModeType) => () => void;
}

export interface IAppThemeProps {
  palette: JSONObject;
  children: (props: IFormThemeDto) => React.JSX.Element;
}

export const AppTheme: React.FC<IAppThemeProps> = memo(({ palette, children }) => {
  const dispatch = useAppDispatch();
  const { location } = useAppRouter();
  const { modeTheme } = useAppSelector((state) => state.common);
  const { mode, theme, switchTheme } = useTheme(palette, modeTheme);

  useEffect(() => {
    document.body.classList.remove('mode-dark');
    document.body.classList.remove('mode-light');
    document.body.classList.add('mode-' + mode);
    dispatch(CommonAction.setModeTheme(mode));
  }, [mode, dispatch]);

  useEffect(() => {
    dispatch(CommonAction.clearMessage());
    !location.pathname.includes('#') &&
      dispatch(CommonAction.addHistory({ id: '', title: '', link: location.pathname }));
  }, [location, dispatch]);

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
      <HelmetProvider data-rh='true' ata-react-helmet='true'>
        <AppScrollToAnchor />
        <MdThemeProvider theme={theme}>
          <div className={'flex heigth100 mode-' + mode}>{children({ mode, theme, switchTheme })}</div>
          <ShowMessage />
        </MdThemeProvider>
      </HelmetProvider>
    </SnackbarProvider>
  );
});
