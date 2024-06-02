import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { PropsWithChildren, ReactNode, memo } from 'react';
import { CustomChatbot } from '../../../../module/custom/chatbot/component/CustomChatbot';
import { CustomChatbotIntegration } from '../../../../module/custom/chatbot/component/CustomChatbotIntegration';
import { IHeaderDto } from '../../../dto/HeaderDto';
import { IMenuDto } from '../../../dto/menu/MenuDto';
import { DRAWER_WIDTH } from '../../../hook/useTemplateDrawer';
import { useTemplateFirebaseToken } from '../../../hook/useTemplateFirebaseToken';
import { Container } from '../../container/Container';
import { CookieConsents } from '../../cookie/CookieConsents';
import { Footer, IFoorterProps } from '../../footer/Footer';
import { Header } from '../../header/Header';
import { MenuDrawer } from '../../menu/drawer/MenuDrawer';
import { MenuDrawerResize } from '../../menu/drawer/MenuDrawerResize';
import { AppTheme } from '../AppTheme';

export interface IAppThemeProviderProps extends IHeaderDto, IFoorterProps, PropsWithChildren {
  palette: JSONObject;
  generateToken?: () => Promise<string | undefined>;
  menu: IMenuDto[];
  showNotification?: boolean;
  showLanguage?: boolean;
  widthDrawer?: boolean;
  reactHeader?: ReactNode;
  reactHeaderButton?: ReactNode;
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
    reactHeaderButton,
    children,
    ...rest
  }) => {
    useTemplateFirebaseToken(rest.apiUrl, generateToken);

    return (
      <AppTheme palette={palette}>
        <>
          <MenuDrawerResize />
          <Header
            menu={menu}
            widthDrawer={widthDrawer}
            showNotification={showNotification}
            showLanguage={showLanguage}
            reactHeader={reactHeader}
            reactHeaderButton={reactHeaderButton}
            {...rest}
          />
          <div className='flex flex-row flex1 overflow-hidden'>
            {widthDrawer && <MenuDrawer menu={menu} drawerWidth={DRAWER_WIDTH} />}
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
