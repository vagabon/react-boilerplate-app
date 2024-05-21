import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { PropsWithChildren, ReactNode, memo } from 'react';
import { IMenuDto } from '../../../../dto/menu/MenuDto';
import { CustomChatbot } from '../../../../module/custom/chatbot/component/CustomChatbot';
import { CustomChatbotIntegration } from '../../../../module/custom/chatbot/component/CustomChatbotIntegration';
import { IHeaderDto } from '../../../dto/HeaderDto';
import { useTemplateFirebaseToken } from '../../../hook/useTemplateFirebaseToken';
import { useTemplateTheme } from '../../../hook/useTemplateTheme';
import { Container } from '../../container/Container';
import { CookieConsents } from '../../cookie/CookieConsents';
import { Footer, IFoorterProps } from '../../footer/Footer';
import { Header } from '../../header/Header';
import { MenuDrawer } from '../../menu/MenuDrawer';
import { AppTheme } from '../AppTheme';

export interface IAppThemeProviderProps extends IHeaderDto, IFoorterProps, PropsWithChildren {
  palette: JSONObject;
  generateToken?: () => Promise<string | undefined>;
  menu: IMenuDto[];
  showNotification?: boolean;
  showLanguage?: boolean;
  widthDrawer?: boolean;
  reactHeader?: ReactNode;
  iframeChatbotUrl?: string;
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = memo(
  ({
    palette,
    generateToken,
    menu,
    showNotification,
    showLanguage = false,
    widthDrawer = true,
    reactHeader,
    children,
    ...rest
  }) => {
    const { drawerWidth, openDrawer, variantDrawer, showOpenDrawer, handleDrawerOpen } = useTemplateTheme();
    useTemplateFirebaseToken(rest.apiUrl, generateToken);

    return (
      <AppTheme palette={palette}>
        <>
          <Header
            menu={menu}
            widthDrawer={widthDrawer}
            showNotification={showNotification}
            showOpenDrawer={showOpenDrawer}
            showLanguage={showLanguage}
            callbackDrawer={handleDrawerOpen(openDrawer)}
            reactHeader={reactHeader}
            {...rest}
          />
          <div className='flex flex-row' style={{ flex: '1', overflow: 'hidden' }}>
            {widthDrawer && (
              <MenuDrawer
                menu={menu}
                drawerWidth={drawerWidth}
                openDrawer={openDrawer}
                variantDrawer={variantDrawer}
                callbackClose={handleDrawerOpen(true)}
              />
            )}
            <Container>{children}</Container>
          </div>
          <CookieConsents />
          <CustomChatbot iframeUrl={rest.iframeChatbotUrl} />
          <CustomChatbotIntegration />
          <Footer {...rest} />
        </>
      </AppTheme>
    );
  },
);
