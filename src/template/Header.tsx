import { useCallback } from 'react';
import { useUserAuth } from '../hook/user/useUserAuth';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';

import CustomModaleConfirm from '../module/custom/modale/component/CustomModaleConfirm';

import {
  IApiDto,
  IconClickable,
  MdAvatar,
  MdBouttonGroup,
  MdBox,
  MdButton,
  MdLinearProgress,
  MdMenuItem,
  MdToolbar,
  MdTypo,
  ModeType,
  useAppRouter,
} from '@vagabond-inc/react-boilerplate-md';
import { IMenuDto } from '../dto/menu/MenuDto';
import HasRole from '../hook/role/HasRole';

export interface IHeaderProps {
  mode: ModeType;
  conf: { TITLE: string; LOGO: string };
  menu: IMenuDto[];
  callbackTheme?: () => void;
}

const Header: React.FC<IHeaderProps> = ({ mode, conf, menu, callbackTheme }) => {
  const { navigate, Link } = useAppRouter();
  const dispatch = useAppDispatch();
  const { loading, history } = useAppSelector((state) => state.common);
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useUserAuth();

  const goBack = useCallback((): void => {
    const lastPage = history[history.length - 2];
    dispatch(CommonAction.sliceHistory());
    navigate(lastPage.link);
  }, [dispatch, navigate, history]);

  return (
    <>
      <MdBox component='header' sx={{ bgcolor: 'background.paper' }}>
        <MdToolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className='back-button' style={{ width: '30px' }}>
            {history.length > 1 && <MdButton variant='text' icon='back' callback={goBack} />}
          </div>
          <MdTypo align='left' noWrap={true} sx={{ flex: 1 }}>
            <Link to='/' style={{ display: 'flex' }}>
              <img src={conf.LOGO} width={40} alt={'Logo de ' + conf.TITLE} />
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
        <MdToolbar
          id='menu'
          sx={{
            bgcolor: 'background.paper',
            justifyContent: 'center',
            borderBottom: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.12)',
          }}>
          <MdBouttonGroup variant='text' size='large'>
            {menu?.map((menu) => (
              <HasRole roles={menu.roles} key={menu.title} showError={false}>
                <MdMenuItem name={menu.title} url={menu.link} childrens={menu.childrens} />
              </HasRole>
            ))}
          </MdBouttonGroup>
        </MdToolbar>
      </MdBox>
      {loading ? <MdLinearProgress /> : <div style={{ minHeight: '4px' }}></div>}
    </>
  );
};
export default Header;
