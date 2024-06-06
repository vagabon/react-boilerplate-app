import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../../store/Store';
import { useTemplateDrawer } from '../../../hook/useTemplateDrawer';

export interface IMenuDrawerButtonProps {
  widthDrawer: boolean;
}

export const MenuDrawerButton: React.FC<IMenuDrawerButtonProps> = memo(({ widthDrawer }) => {
  const open = useAppSelector((state) => state.common.drawer.open, shallowEqual);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);
  const force = useAppSelector((state) => state.common.drawer.force, shallowEqual);
  const { handleSwitchDrawer } = useTemplateDrawer();

  return (
    <>
      {widthDrawer && !force && isLoggedIn && (
        <IconClickable color='default' icon='menu' aria-label='open drawer' callback={handleSwitchDrawer(open)} />
      )}
    </>
  );
});
