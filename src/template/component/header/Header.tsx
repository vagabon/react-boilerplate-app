import { MdAppBar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/app-bar/MdAppBar';
import { ReactNode, memo } from 'react';
import { IHeaderDto } from '../../dto/HeaderDto';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { Toolbar } from '../toolbar/Toolbar';
import ToolbarProgress from '../toolbar/progress/ToolbarProgress';
import { ToolbarSpace } from '../toolbar/space/ToolbarSpace';

export interface IHeaderProps extends IHeaderDto {
  menu: IMenuDto[];
  widthDrawer: boolean;
  showLanguage: boolean;
  showNotification?: boolean;
  reactHeader?: ReactNode;
}

export const Header: React.FC<IHeaderProps> = memo(({ menu, widthDrawer, ...rest }) => {
  return (
    <>
      <MdAppBar className='app-bar' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <ToolbarSpace />
        <Toolbar
          apiUrl={rest.apiUrl}
          image={rest.image}
          title={rest.title}
          menu={menu}
          showNotification={rest.showNotification}
          showLanguage={rest.showLanguage}
          widthDrawer={widthDrawer}
          reactHeader={rest.reactHeader}
        />
      </MdAppBar>
      {widthDrawer && <div className='drawer-height'></div>}
      <ToolbarProgress />
    </>
  );
});
