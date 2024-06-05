import { MdToolbar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/toolbar/MdToolbar';
import { ReactNode } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../store/Store';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { Menu } from '../menu/Menu';
import { MenuDrawerButton } from '../menu/drawer/MenuDrawerButton';
import ToolbarButtons from './buttons/ToolbarButtons';
import { ToolbarDropdown } from './dropdown/ToolbarDropdown';
import { ToolbarNotification } from './notification/ToolbarNotification';
import { ToolbarTitle } from './title/ToolbarTitle';

export interface IToolbarProps {
  apiUrl: string;
  image: string;
  title: string;
  menu: IMenuDto[];
  showNotification?: boolean;
  showLanguage: boolean;
  widthDrawer: boolean;
  reactHeader?: ReactNode;
  reactHeaderButton?: ReactNode;
}

export const Toolbar: React.FC<IToolbarProps> = ({ apiUrl, image, title, menu, ...rest }) => {
  const force = useAppSelector((state) => state.common.drawer.force, shallowEqual);

  return (
    <>
      <MdToolbar id='header' className='max-width' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MenuDrawerButton widthDrawer={rest.widthDrawer} />
        {force ? <div className='flex1'></div> : <ToolbarTitle title={title} image={image} />}
        {rest.showNotification && <ToolbarNotification apiUrl={apiUrl} />}
        {rest.reactHeaderButton}
        <ToolbarButtons />
        <ToolbarDropdown apiUrl={apiUrl} reactHeader={rest.reactHeader} />
      </MdToolbar>
      {!rest.widthDrawer && <Menu menu={menu} />}
    </>
  );
};
