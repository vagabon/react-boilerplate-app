import { AppBar, Badge, IconButton } from '@mui/material';
import {
  IApiDto,
  IconClickable,
  MdAvatar,
  MdBouttonGroup,
  MdButton,
  MdLinearProgress,
  MdMenuItem,
  MdToolbar,
  MdTypo,
  ModeType,
  useAppRouter,
  useIcon,
} from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { IMenuDto } from '../dto/menu/MenuDto';
import HasRole from '../hook/role/HasRole';
import { useUserAuth } from '../hook/user/useUserAuth';
import CustomModaleConfirm from '../module/custom/modale/component/CustomModaleConfirm';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';
import Language from './Language';
import { useAppImage } from './hook/useAppImage';

export interface IHeaderProps {
  apiUrl: string;
  mode: ModeType;
  conf: { TITLE: string; LOGO: string };
  menu: IMenuDto[];
  callbackTheme?: () => void;
  widthDrawer?: boolean;
  showOpenDrawer?: boolean;
  callbackDrawer?: () => void;
  i18n?: i18nType;
  nbNotification?: number;
  showNotification?: boolean;
  reactHeader?: ReactNode;
}

const Header: React.FC<IHeaderProps> = memo(
  ({
    apiUrl,
    mode,
    conf,
    menu,
    callbackTheme,
    widthDrawer,
    showOpenDrawer,
    callbackDrawer,
    i18n,
    nbNotification,
    reactHeader,
    showNotification,
  }) => {
    const dispatch = useAppDispatch();
    const { location, navigate, Link, handleNavigate } = useAppRouter();
    const { loading, history } = useAppSelector((state) => state.common);
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const { handleLogout } = useUserAuth();
    const [currentLocation, setCurrentLocation] = useState<string>(location.pathname);
    const { getIcon } = useIcon();
    const { getImage } = useAppImage(apiUrl);

    useEffect(() => {
      setCurrentLocation(location.pathname);
    }, [location]);

    const goBack = useCallback((): void => {
      const lastPage = history[history.length - 2];
      dispatch(CommonAction.sliceHistory());
      navigate(lastPage.link);
    }, [dispatch, navigate, history]);

    return (
      <>
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <MdToolbar id='header' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {widthDrawer && showOpenDrawer && (
              <IconClickable color='inherit' icon='menu' aria-label='open drawer' callback={callbackDrawer} />
            )}
            {!widthDrawer && (
              <div className='back-button' style={{ width: '30px' }}>
                {history.length > 1 && <MdButton variant='text' icon='back' callback={goBack} />}
              </div>
            )}
            <MdTypo variant='body2' align='left' color='secondary' noWrap={true} sx={{ flex: 1, display: 'flex' }}>
              <Link to='/' style={{ display: 'contents' }}>
                <img src={conf.LOGO} width={40} alt={'Logo de ' + conf.TITLE} />
                <span
                  className='flex justify-center'
                  style={{ marginLeft: '1rem', fontSize: '1.2rem', overflow: 'hidden' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conf.TITLE}
                  </span>
                </span>
              </Link>
            </MdTypo>
            <IconClickable
              className='hidden-responsive'
              icon={mode === 'dark' ? 'sun' : 'moon'}
              callback={callbackTheme}
            />
            {i18n && <Language i18n={i18n} />}
            {showNotification && isLoggedIn && (
              <IconButton
                size='large'
                aria-label={'show ' + nbNotification + ' new notifications'}
                onClick={handleNavigate('/notification')}>
                <Badge badgeContent={nbNotification} color='error'>
                  {getIcon('notification')}
                </Badge>
              </IconButton>
            )}
            {reactHeader}
            <MdButton url='/auth/signup' label='AUTH:SIGNUP' variant='outlined' show={!isLoggedIn} />
            <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={!isLoggedIn} />
            {user?.user && (
              <MdAvatar
                url='/profile'
                name={user.user?.username as string}
                image={getImage(user.user['avatar' as keyof IApiDto])}
              />
            )}
            {user?.user && (
              <CustomModaleConfirm
                className='hidden-responsive'
                icon='exit'
                iconColor='error'
                callback={handleLogout}
              />
            )}
          </MdToolbar>
          {!widthDrawer && (
            <MdToolbar
              id='menu'
              sx={{
                justifyContent: 'center',
                borderBottom: 1,
                borderColor: 'divider',
              }}>
              <MdBouttonGroup variant='text' size='large'>
                {menu?.map((menu) => (
                  <HasRole roles={menu.roles} key={menu.title} showError={false}>
                    <MdMenuItem
                      name={menu.title}
                      url={menu.link}
                      childrens={menu.childrens}
                      currentLocation={currentLocation}
                    />
                  </HasRole>
                ))}
              </MdBouttonGroup>
            </MdToolbar>
          )}
        </AppBar>
        <div style={{ height: '50px' }}></div>
        {loading ? <MdLinearProgress /> : <div style={{ minHeight: '4px' }}></div>}
      </>
    );
  },
);

export default Header;
