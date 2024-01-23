import { JSONObject, MdThemeProvider, useAppRouter, useTheme } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IMenuDto } from '../dto/menu/MenuDto';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch } from '../store/Store';
import Footer from './Footer';
import Header from './Header';
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

  useEffect(() => {
    dispatch(CommonAction.clearMessage());
    dispatch(CommonAction.addHistory({ id: '', title: '', link: location.pathname }));
  }, [location, dispatch]);

  return (
    <HelmetProvider data-rh='true' ata-react-helmet='true'>
      <MdThemeProvider theme={theme}>
        <div className={'flex heigth100 mode-' + mode}>
          <Header mode={mode} conf={conf} menu={menu} callbackTheme={switchTheme(mode)} />

          <div className='flex main-container'>{children}</div>

          <ShowMessage />

          <Footer conf={conf} version={version} />
        </div>
      </MdThemeProvider>
    </HelmetProvider>
  );
};

export default AppTheme;
