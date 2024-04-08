import {
  ITheme,
  JSONObject,
  MdThemeProvider,
  ModeType,
  useAppRouter,
  useTheme,
} from '@vagabond-inc/react-boilerplate-md';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { useAppTheme } from './hook/useAppTheme';

export interface IFormThemeDto {
  mode: ModeType;
  theme: ITheme | undefined;
  switchTheme: (newMode: ModeType) => () => void;
}

export interface IAppThemeProps {
  palette: JSONObject;
  children: (props: IFormThemeDto) => React.JSX.Element;
}

const AppTheme: React.FC<IAppThemeProps> = ({ palette, children }) => {
  const dispatch = useAppDispatch();
  const { location } = useAppRouter();
  const { modeTheme } = useAppSelector((state) => state.common);
  const { mode, theme, switchTheme } = useTheme(palette, modeTheme);
  const { handleCloseSnackbar } = useAppTheme();

  useEffect(() => {
    document.body.classList.remove('mode-dark');
    document.body.classList.remove('mode-light');
    document.body.classList.add('mode-' + mode);
    dispatch(CommonAction.setModeTheme(mode));
  }, [mode, dispatch]);

  useEffect(() => {
    dispatch(CommonAction.clearMessage());
    dispatch(CommonAction.addHistory({ id: '', title: '', link: location.pathname }));
  }, [location, dispatch]);

  return (
    <SnackbarProvider maxSnack={5} action={handleCloseSnackbar}>
      <HelmetProvider data-rh='true' ata-react-helmet='true'>
        <MdThemeProvider theme={theme}>
          <div className={'flex heigth100 mode-' + mode}>{children({ mode, theme, switchTheme })}</div>
        </MdThemeProvider>
      </HelmetProvider>
    </SnackbarProvider>
  );
};

export default AppTheme;
