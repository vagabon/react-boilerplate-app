import { JSONObject, MdThemeProvider, useAppRouter, useTheme } from '@vagabond-inc/react-boilerplate-md';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IMenuDto } from '../dto/menu/MenuDto';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch } from '../store/Store';
import Footer from './Footer';
import Header from './Header';
import MenuDrawer from './MenuDrawer';
import { useAppTheme } from './hook/useAppTheme';
import ShowMessage from './message/ShowMessage';

export interface IConfDto {
  TITLE: string;
  LOGO: string;
  FOOTER: {
    WEBSITE: string;
    URL: string;
    TARGET: string;
  };
}

export interface IAppThemeProps {
  palette: JSONObject;
  conf: IConfDto;
  version: string;
  menu: IMenuDto[];
  children: ReactNode;
}

const AppTheme: React.FC<IAppThemeProps> = ({ palette, conf, version, menu, children }) => {
  const { location } = useAppRouter();
  const dispatch = useAppDispatch();
  const { mode, theme, switchTheme } = useTheme(palette);
  const { drawerWidth, openDrawer, variantDrawer, showOpenDrawer, handleDrawerOpen, handleCloseSnackbar } =
    useAppTheme();

  useEffect(() => {
    document.body.classList.remove('mode-dark');
    document.body.classList.remove('mode-light');
    document.body.classList.add('mode-' + mode);
  }, [mode]);

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
            />

            <div className='flex flex-row' style={{ gap: '10px', flex: '1', overflow: 'hidden' }}>
              <MenuDrawer
                menu={menu}
                drawerWidth={drawerWidth}
                openDrawer={openDrawer}
                variantDrawer={variantDrawer}
                callbackClose={handleDrawerOpen(true)}
              />
              <div className='flex main-container' style={{ marginTop: '50px' }}>
                {children}
              </div>
            </div>

            <ShowMessage />

            <Footer conf={conf} version={version} />
          </div>
        </MdThemeProvider>
      </HelmetProvider>
    </SnackbarProvider>
  );
};

export default AppTheme;
