import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdToolbar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/toolbar/MdToolbar';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { ReactNode } from 'react';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { Language } from '../language/Language';
import { Menu } from '../menu/Menu';
import { MenuDrawerButton } from '../menu/drawer/MenuDrawerButton';
import { MenuDrawerResize } from '../menu/drawer/MenuDrawerResize';
import ToolbarButtons from './buttons/ToolbarButtons';
import { ToolbarDropdown } from './dropdown/ToolbarDropdown';
import { ToolbarNotification } from './notification/ToolbarNotification';
import { ToolbarTheme } from './theme/ToolbarTheme';

export interface IToolbarProps {
  apiUrl: string;
  image: string;
  title: string;
  menu: IMenuDto[];
  showNotification?: boolean;
  showLanguage: boolean;
  widthDrawer: boolean;
  reactHeader?: ReactNode;
}

export const Toolbar: React.FC<IToolbarProps> = ({ apiUrl, image, title, menu, ...rest }) => {
  return (
    <>
      <MdToolbar id='header' className='max-width' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MenuDrawerResize />
        <MenuDrawerButton widthDrawer={rest.widthDrawer} />
        <MdTypo className='flex flex1' variant='body2' align='left' color='inherit' noWrap={true}>
          <MdLink href='/' className='flex-row gap10 overflow-hidden' color='inherit'>
            <img src={image} width={40} title={title} alt={'Logo de ' + title} />
            <span className='flex justify-center overflow-hidden text-xl'>
              <span className='ellipsis'>{title}</span>
            </span>
          </MdLink>
        </MdTypo>
        <ToolbarTheme />
        {rest.showNotification && <ToolbarNotification apiUrl={apiUrl} />}
        <Language show={rest.showLanguage} />
        {rest.reactHeader}
        <ToolbarButtons apiUrl={apiUrl} />
        <ToolbarDropdown showLanguage={rest.showLanguage} reactHeader={rest.reactHeader} />
      </MdToolbar>
      {!rest.widthDrawer && <Menu menu={menu} />}
    </>
  );
};
