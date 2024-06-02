import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdAvatar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/avatar/MdAvatar';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { MdMenu } from '@vagabond-inc/react-boilerplate-md/dist/md/component/menu/MdMenu';
import { MdMenuItem } from '@vagabond-inc/react-boilerplate-md/dist/md/component/menu/item/MdMenuItem';
import { useMenu } from '@vagabond-inc/react-boilerplate-md/dist/md/hook/useMenu';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { ReactNode, memo, useCallback } from 'react';
import { useAppImage } from '../../../../app/image/hook/useAppImage';
import { useAuthLogout } from '../../../../module/auth/hook/logout/useAuthLogout';
import { CustomModaleConfirm } from '../../../../module/custom/modale/component/CustomModaleConfirm';
import { useAppSelector } from '../../../../store/Store';
import { Language } from '../../language/Language';
import { ToolbarTheme } from '../theme/ToolbarTheme';

export interface IToolbarDropdownProps {
  apiUrl: string;
  showLanguage?: boolean;
  reactHeader?: ReactNode;
}

export const ToolbarDropdown: React.FC<IToolbarDropdownProps> = memo(({ apiUrl, showLanguage, reactHeader }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const username = useAppSelector((state) => state.auth.user?.user?.username);
  const avatar = useAppSelector((state) => state.auth.user?.user?.avatar);
  const { navigate } = useAppRouter();
  const { handleLogout } = useAuthLogout();
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const { getIcon } = useIcon();
  const { getImage } = useAppImage(apiUrl);

  const logout = useCallback(() => {
    handleLogout();
    handleClose();
  }, [handleLogout, handleClose]);

  const goToProfile = useCallback(() => {
    navigate?.('/profile');
    handleClose();
  }, [navigate, handleClose]);

  return (
    <>
      <IconClickable size='small' onClick={handleClick} icon={!isLoggedIn ? 'tune' : undefined}>
        {isLoggedIn ? <MdAvatar name={username as string} image={getImage(avatar)} /> : undefined}
      </IconClickable>
      <MdMenu
        id='appbar-toolbar'
        className='justify-center'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <>
          {isLoggedIn && (
            <>
              <MdMenuItem className='justify-center gap4' onClick={goToProfile}>
                {getIcon('avatar')} Profile
              </MdMenuItem>
              {reactHeader && (
                <MdMenuItem className='justify-center gap4' onClick={goToProfile}>
                  {reactHeader}
                </MdMenuItem>
              )}
              <MdDivider />
            </>
          )}
          <MdMenuItem className='justify-center'>
            <ToolbarTheme />
          </MdMenuItem>
          {showLanguage && (
            <MdMenuItem className='justify-center'>
              <Language fullWidth />
            </MdMenuItem>
          )}
          {isLoggedIn && (
            <>
              <MdDivider />
              <MdMenuItem className='justify-center' onClick={handleClose}>
                <CustomModaleConfirm
                  buttonVariant='contained'
                  buttonColor='error'
                  icon='exit'
                  label='Logout'
                  callback={logout}
                />
              </MdMenuItem>
            </>
          )}
        </>
      </MdMenu>
    </>
  );
});
