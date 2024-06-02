import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdMenu } from '@vagabond-inc/react-boilerplate-md/dist/md/component/menu/MdMenu';
import { ReactNode, memo, useCallback } from 'react';
import { useAuthLogout } from '../../../../module/auth/hook/logout/useAuthLogout';
import { CustomModaleConfirm } from '../../../../module/custom/modale/component/CustomModaleConfirm';
import { useAppSelector } from '../../../../store/Store';
import { Language } from '../../language/Language';
import { ToolbarTheme } from '../theme/ToolbarTheme';

export interface IToolbarDropdownProps {
  showLanguage?: boolean;
  reactHeader?: ReactNode;
}

export const ToolbarDropdown: React.FC<IToolbarDropdownProps> = memo(({ showLanguage, reactHeader }) => {
  const { getIcon } = useIcon();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { handleLogout } = useAuthLogout();

  const getMode = useCallback(() => {
    return <ToolbarTheme />;
  }, []);

  const getLanguage = useCallback(() => {
    return <Language show={showLanguage} fullWidth />;
  }, [showLanguage]);

  return (
    <MdMenu
      className='button-icon'
      color='inherit'
      variant='outlined'
      title={<>{getIcon('tune', 'inherit')}</>}
      elements={[
        {
          name: 'header',
          element: () => <>{reactHeader}</>,
        },
        {
          name: 'theme',
          element: () => getMode(),
        },
        {
          name: 'language',
          element: () => getLanguage(),
        },
        {
          name: 'deco',
          element: () => (
            <>
              {isLoggedIn && (
                <CustomModaleConfirm
                  classNameButton='hidden-responsive'
                  buttonVariant='contained'
                  buttonColor='error'
                  icon='exit'
                  callback={handleLogout}
                />
              )}
            </>
          ),
        },
      ]}
    />
  );
});
