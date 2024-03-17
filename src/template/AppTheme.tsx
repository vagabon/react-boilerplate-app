import { JSONObject, MdThemeProvider, useAppRouter, useTheme } from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useEffect, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IMenuDto } from '../dto/menu/MenuDto';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch } from '../store/Store';
import CookieConsents from './CookieConsents';
import Footer from './Footer';
import Header from './Header';
import MenuDrawer from './MenuDrawer';
import { useAppFirebaseToken } from './hook/useAppFirebaseToken';
import { useAppNotification } from './hook/useAppNotification';
import { useAppScroll } from './hook/useAppScroll';
import { useAppTheme } from './hook/useAppTheme';
import ShowMessage from './message/ShowMessage';

export interface IConfDto {
  TITLE: string;
  LOGO: string;
  FOOTER: {
    WEBSITE: string;
    URL: string;
    TARGET: string;
    MENTION_URL?: string;
    CGV_URL?: string;
  };
}

export interface IAppThemeProps {
  palette: JSONObject;
  conf: IConfDto;
  email: string;
  menu: IMenuDto[];
  children: ReactNode;
  i18n?: i18nType;
  showNotification?: boolean;
  generateToken: () => Promise<string | undefined>;
}

const AppTheme: React.FC<IAppThemeProps> = ({
  palette,
  conf,
  email,
  menu,
  children,
  i18n,
  showNotification,
  generateToken,
}) => {
  const dispatch = useAppDispatch();
  const mainContainer = useRef<HTMLDivElement | null>(null);
  const { location } = useAppRouter();
  const { mode, theme, switchTheme } = useTheme(palette);
  const { drawerWidth, openDrawer, variantDrawer, showOpenDrawer, handleDrawerOpen, handleCloseSnackbar } =
    useAppTheme();
  useAppFirebaseToken(generateToken);
  const { nbNotification } = useAppNotification();
  const { handleScroll, getScrollPage } = useAppScroll();

  useEffect(() => {
    getScrollPage(location.pathname);
  }, [getScrollPage, location.pathname]);

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
          <div className={'flex heigth100 mode-' + mode}>
            <Header
              mode={mode}
              conf={conf}
              menu={menu}
              widthDrawer={true}
              showOpenDrawer={showOpenDrawer}
              callbackTheme={switchTheme(mode)}
              callbackDrawer={handleDrawerOpen(openDrawer)}
              i18n={i18n}
              nbNotification={nbNotification}
              showNotification={showNotification}
            />

            <div className='flex flex-row' style={{ flex: '1', overflow: 'hidden' }}>
              <MenuDrawer
                menu={menu}
                drawerWidth={drawerWidth}
                openDrawer={openDrawer}
                variantDrawer={variantDrawer}
                callbackClose={handleDrawerOpen(true)}
              />
              <div
                ref={mainContainer}
                className='main-container'
                onScroll={handleScroll(mainContainer, location.pathname)}>
                {children}
              </div>
            </div>

            <ShowMessage />

            <CookieConsents />
            <Footer conf={conf} email={email} />
          </div>
        </MdThemeProvider>
      </HelmetProvider>
    </SnackbarProvider>
  );
};

export default AppTheme;
