import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdToolbar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/toolbar/MdToolbar';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { ReactNode } from 'react';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { Language } from '../language/Language';
import { Menu } from '../menu/Menu';
import ToolbarButtons from './buttons/ToolbarButtons';
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
  showOpenDrawer: boolean;
  callbackDrawer?: () => void;
  reactHeader?: ReactNode;
}

export const Toolbar: React.FC<IToolbarProps> = ({ apiUrl, image, title, menu, ...rest }) => {
  return (
    <>
      <MdToolbar id='header' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {rest.widthDrawer && rest.showOpenDrawer && (
          <IconClickable color='inherit' icon='menu' aria-label='open drawer' callback={rest.callbackDrawer} />
        )}
        <MdTypo variant='body2' align='left' color='inherit' noWrap={true} sx={{ flex: 1, display: 'flex' }}>
          <MdLink href='/' className='flex-row gap10' color='inherit' style={{ overflow: 'hidden' }}>
            <img src={image} width={40} title={title} alt={'Logo de ' + title} />
            <span className='flex justify-center' style={{ fontSize: '1.2rem', overflow: 'hidden' }}>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
            </span>
          </MdLink>
        </MdTypo>
        <ToolbarTheme />
        {rest.showNotification && <ToolbarNotification apiUrl={apiUrl} />}
        <Language show={rest.showLanguage} />
        {rest.reactHeader}
        <ToolbarButtons apiUrl={apiUrl} />
      </MdToolbar>
      {!rest.widthDrawer && <Menu menu={menu} />}
    </>
  );
};
