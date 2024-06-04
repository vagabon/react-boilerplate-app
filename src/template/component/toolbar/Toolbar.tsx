import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdToolbar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/toolbar/MdToolbar';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { ReactNode } from 'react';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { Menu } from '../menu/Menu';
import { MenuDrawerButton } from '../menu/drawer/MenuDrawerButton';
import ToolbarButtons from './buttons/ToolbarButtons';
import { ToolbarDropdown } from './dropdown/ToolbarDropdown';
import { ToolbarNotification } from './notification/ToolbarNotification';

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
  return (
    <>
      <MdToolbar id='header' className='max-width' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MenuDrawerButton widthDrawer={rest.widthDrawer} />
        <MdTypo className='flex flex1' variant='body2' align='left' noWrap={true}>
          <MdLink href='/' className='flex-row gap10 overflow-hidden text-black font-weight-450 line-height-15'>
            <img src={image} width={40} title={title} alt={'Logo de ' + title} />
            <span className='flex justify-center overflow-hidden text-xl'>
              <span className='ellipsis'>{title}</span>
            </span>
          </MdLink>
        </MdTypo>
        {rest.showNotification && <ToolbarNotification apiUrl={apiUrl} />}
        {rest.reactHeaderButton}
        <ToolbarButtons />
        <ToolbarDropdown apiUrl={apiUrl} showLanguage={rest.showLanguage} reactHeader={rest.reactHeader} />
      </MdToolbar>
      {!rest.widthDrawer && <Menu menu={menu} />}
    </>
  );
};
