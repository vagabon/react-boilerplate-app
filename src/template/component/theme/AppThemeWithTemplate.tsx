import { JSONObject, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, memo, useEffect, useRef } from 'react';
import { IMenuDto, i18nType } from '../../..';
import Footer from '../../Footer';
import Header from '../../Header';
import { useAppFirebaseToken } from '../../hook/useAppFirebaseToken';
import { useAppNotification } from '../../hook/useAppNotification';
import { useAppScroll } from '../../hook/useAppScroll';
import { useAppTheme } from '../../hook/useAppTheme';
import CookieConsents from '../cookie/CookieConsents';
import MenuDrawer from '../menu/MenuDrawer';
import AppTheme from './AppTheme';

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

export interface IAppThemeWithTemplateProps {
  apiUrl: string;
  conf: IConfDto;
  palette: JSONObject;
  email: string;
  generateToken: () => Promise<string | undefined>;
  menu: IMenuDto[];
  i18n?: i18nType;
  showNotification?: boolean;
  widthDrawer?: boolean;
  reactHeader?: ReactNode;
  children: ReactNode;
}

const AppThemeWithTemplate = memo<IAppThemeWithTemplateProps>(
  ({
    apiUrl,
    conf,
    palette,
    email,
    generateToken,
    menu,
    i18n,
    showNotification,
    widthDrawer = true,
    reactHeader,
    children,
  }) => {
    const mainContainer = useRef<HTMLDivElement | null>(null);
    const { location } = useAppRouter();
    const { drawerWidth, openDrawer, variantDrawer, showOpenDrawer, handleDrawerOpen } = useAppTheme();
    useAppFirebaseToken(apiUrl, generateToken);
    const { nbNotification } = useAppNotification(apiUrl);
    const { handleScroll, getScrollPage } = useAppScroll();

    useEffect(() => {
      getScrollPage(location.pathname);
    }, [getScrollPage, location.pathname]);

    return (
      <AppTheme palette={palette}>
        {({ mode, switchTheme }) => (
          <>
            <Header
              apiUrl={apiUrl}
              mode={mode}
              conf={conf}
              menu={menu}
              widthDrawer={widthDrawer}
              showOpenDrawer={showOpenDrawer}
              callbackTheme={switchTheme(mode)}
              callbackDrawer={handleDrawerOpen(openDrawer)}
              i18n={i18n}
              nbNotification={nbNotification}
              showNotification={showNotification}
              reactHeader={reactHeader}
            />
            <div className='flex flex-row' style={{ flex: '1', overflow: 'hidden' }}>
              {widthDrawer && (
                <MenuDrawer
                  apiUrl={apiUrl}
                  menu={menu}
                  drawerWidth={drawerWidth}
                  openDrawer={openDrawer}
                  variantDrawer={variantDrawer}
                  callbackClose={handleDrawerOpen(true)}
                />
              )}
              <div
                ref={mainContainer}
                className='main-container'
                onScroll={handleScroll(mainContainer, location.pathname)}>
                {children}
              </div>
            </div>
            <CookieConsents />
            <Footer conf={conf} email={email} />
          </>
        )}
      </AppTheme>
    );
  },
);

export default AppThemeWithTemplate;
