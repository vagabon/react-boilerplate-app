import { AppBar } from '@mui/material';
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
} from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import { IMenuDto } from '../dto/menu/MenuDto';
import HasRole from '../hook/role/HasRole';
import { useUserAuth } from '../hook/user/useUserAuth';
import CustomModaleConfirm from '../module/custom/modale/component/CustomModaleConfirm';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';

export interface IHeaderProps {
  mode: ModeType;
  conf: { TITLE: string; LOGO: string };
  menu: IMenuDto[];
  callbackTheme?: () => void;
  widthDrawer?: boolean;
  showOpenDrawer?: boolean;
  callbackDrawer?: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  mode,
  conf,
  menu,
  callbackTheme,
  widthDrawer,
  showOpenDrawer,
  callbackDrawer,
}) => {
  const { location, navigate, Link } = useAppRouter();
  const dispatch = useAppDispatch();
  const { loading, history } = useAppSelector((state) => state.common);
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useUserAuth();
  const [currentLocation, setCurrentLocation] = useState<string>(location.pathname);

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
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conf.TITLE}</span>
              </span>
            </Link>
          </MdTypo>
          <IconClickable icon={mode === 'dark' ? 'sun' : 'moon'} callback={callbackTheme} />
          <MdButton url='/auth/signup' label='AUTH:SIGNUP' variant='text' show={!isLoggedIn} />
          <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={!isLoggedIn} />
          {user?.user && (
            <MdAvatar
              url='/profile'
              name={user.user?.username as string}
              image={user.user['avatar' as keyof IApiDto] as string}
            />
          )}
          {user?.user && <CustomModaleConfirm icon='exit' iconColor='error' callback={handleLogout} />}
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
      {loading ? <MdLinearProgress /> : <div style={{ minHeight: '4px' }}></div>}
    </>
  );
};
export default Header;
