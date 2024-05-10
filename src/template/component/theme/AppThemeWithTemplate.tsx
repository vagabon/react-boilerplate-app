import { JSONObject, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import { ReactNode, memo, useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';
import { IMenuDto } from '../../../dto/menu/MenuDto';
import CustomChatbot from '../../../module/custom/chatbot/component/CustomChatbot';
import CustomChatbotIntegration from '../../../module/custom/chatbot/component/CustomChatbotIntegration';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { useAppDispatch } from '../../../store/Store';
import Footer, { IFoorterProps } from '../../Footer';
import Header, { IHeaderProp } from '../../Header';
import { useAppFirebaseToken } from '../../hook/useAppFirebaseToken';
import { useAppNotification } from '../../hook/useAppNotification';
import { useAppScroll } from '../../hook/useAppScroll';
import { useAppTheme } from '../../hook/useAppTheme';
import CookieConsents from '../cookie/CookieConsents';
import MenuDrawer from '../menu/MenuDrawer';
import AppTheme from './AppTheme';

export interface IAppThemeWithTemplateProps extends IHeaderProp, IFoorterProps {
  palette: JSONObject;
  generateToken?: () => Promise<string | undefined>;
  menu: IMenuDto[];
  i18n?: i18nType;
  showNotification?: boolean;
  widthDrawer?: boolean;
  reactHeader?: ReactNode;
  iframeChatbotUrl?: string;
  children: ReactNode;
}

const AppThemeWithTemplate: React.FC<IAppThemeWithTemplateProps> = memo(
  ({ palette, generateToken, menu, i18n, showNotification, widthDrawer = true, reactHeader, children, ...rest }) => {
    const dispatch = useAppDispatch();
    const mainContainer = useRef<HTMLDivElement | null>(null);
    const { location } = useAppRouter();
    const { drawerWidth, openDrawer, variantDrawer, showOpenDrawer, handleDrawerOpen } = useAppTheme();
    useAppFirebaseToken(rest.apiUrl, generateToken);
    const { nbNotification } = useAppNotification(rest.apiUrl);
    const { handleScroll, getScrollPage } = useAppScroll();

    useEffect(() => {
      getScrollPage(location.pathname);
    }, [getScrollPage, location.pathname]);

    useEffect(() => {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }, [location?.pathname, location?.search]);

    useEffect(() => {
      let navigatorLanguage = navigator?.language?.split('-')?.[0] ?? 'en';
      if (navigatorLanguage !== 'fr' && navigatorLanguage !== 'en') {
        navigatorLanguage = 'en';
      }
      const language = localStorage.getItem('i18nextLng') ?? navigatorLanguage;
      i18n?.changeLanguage(language);
      dispatch(CommonAction.setLanguage(language));
    }, [i18n, dispatch]);

    return (
      <AppTheme palette={palette}>
        {({ mode, switchTheme }) => (
          <>
            <Header
              mode={mode}
              menu={menu}
              widthDrawer={widthDrawer}
              showOpenDrawer={showOpenDrawer}
              callbackTheme={switchTheme(mode)}
              callbackDrawer={handleDrawerOpen(openDrawer)}
              i18n={i18n}
              nbNotification={nbNotification}
              showNotification={showNotification}
              reactHeader={reactHeader}
              {...rest}
            />
            <div className='flex flex-row' style={{ flex: '1', overflow: 'hidden' }}>
              {widthDrawer && (
                <MenuDrawer
                  apiUrl={rest.apiUrl}
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
            <CustomChatbot iframeUrl={rest.iframeChatbotUrl} />
            <CustomChatbotIntegration />
            <Footer {...rest} />
          </>
        )}
      </AppTheme>
    );
  },
);

export default AppThemeWithTemplate;
