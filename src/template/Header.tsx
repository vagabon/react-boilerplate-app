import { AppBar } from '@mui/material';
import {
  IApiDto,
  IconClickable,
  MdAvatar,
  MdBadge,
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
import { ReactNode, memo, useEffect, useState } from 'react';
import { IMenuDto } from '../dto/menu/MenuDto';
import { useAppLocation } from '../hook/location/useAppLocation';
import HasRole from '../hook/role/HasRole';
import { useUserAuth } from '../hook/user/useUserAuth';
import CustomModaleConfirm from '../module/custom/modale/component/CustomModaleConfirm';
import { useAppSelector } from '../store/Store';
import Language from './component/language/Language';
import { useAppImage } from './hook/useAppImage';

export interface IHeaderProp {
  apiUrl: string;
  title: string;
  image: string;
  email: string;
}

export interface IHeaderProps extends IHeaderProp {
  mode: ModeType;
  menu: IMenuDto[];
  callbackTheme?: () => void;
  callbackDrawer?: () => void;
  i18n?: i18nType;
  nbNotification?: number;
  showNotification?: boolean;
  reactHeader?: ReactNode;
  widthDrawer?: boolean;
  showOpenDrawer?: boolean;
}

const Header: React.FC<IHeaderProps> = memo(
  ({ mode, menu, widthDrawer, showNotification, nbNotification, ...rest }) => {
    const { location, Link, handleNavigate } = useAppRouter();
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const { handleLogout } = useUserAuth();
    const { loading, history, goBack } = useAppLocation();
    const [currentLocation, setCurrentLocation] = useState<string>(location.pathname);
    const { getIcon } = useIcon();
    const { getImage } = useAppImage(rest.apiUrl);

    useEffect(() => {
      setCurrentLocation(location.pathname);
    }, [location]);

    return (
      <>
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <MdToolbar id='header' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {widthDrawer && rest.showOpenDrawer && (
              <IconClickable color='inherit' icon='menu' aria-label='open drawer' callback={rest.callbackDrawer} />
            )}
            {!widthDrawer && (
              <div className='back-button' style={{ width: '30px' }}>
                {history.length > 1 && <MdButton variant='text' icon='back' callback={goBack} />}
              </div>
            )}
            <MdTypo variant='body2' align='left' color='secondary' noWrap={true} sx={{ flex: 1, display: 'flex' }}>
              <Link to='/' className='text-secondary' style={{ display: 'contents' }}>
                <img src={rest.image} width={40} title={rest.title} alt={'Logo de ' + rest.title} />
                <span
                  className='flex justify-center'
                  style={{ marginLeft: '1rem', fontSize: '1.2rem', overflow: 'hidden' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {rest.title}
                  </span>
                </span>
              </Link>
            </MdTypo>
            <IconClickable
              className='hidden-responsive'
              icon={mode === 'dark' ? 'sun' : 'moon'}
              callback={rest.callbackTheme}
            />
            {rest.i18n && <Language i18n={rest.i18n} />}
            {showNotification && isLoggedIn && (
              <IconClickable
                aria-label={'show ' + nbNotification + ' new notifications'}
                callback={handleNavigate('/notification')}>
                <MdBadge content={nbNotification}>{getIcon('notification')}</MdBadge>
              </IconClickable>
            )}
            {rest.reactHeader}
            <MdButton url='/auth/signup' label='AUTH:SIGNUP' variant='outlined' show={!isLoggedIn} />
            <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={!isLoggedIn} />
            {user?.user && (
              <IconClickable callback={handleNavigate('/profile')}>
                <MdAvatar name={user.user?.username as string} image={getImage(user.user['avatar' as keyof IApiDto])} />
              </IconClickable>
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
        {widthDrawer && <div style={{ height: '50px' }}></div>}
        {loading && <MdLinearProgress className='linear-progress' />}
      </>
    );
  },
);

export default Header;
