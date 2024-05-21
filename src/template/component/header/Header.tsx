import { MdAppBar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/app-bar/MdAppBar';
import { ReactNode, memo } from 'react';
import { IMenuDto } from '../../../dto/menu/MenuDto';
import { IHeaderDto } from '../../dto/HeaderDto';
import { Toolbar } from '../toolbar/Toolbar';
import ToolbarProgress from '../toolbar/progress/ToolbarProgress';

export interface IHeaderProps extends IHeaderDto {
  menu: IMenuDto[];
  showNotification?: boolean;
  reactHeader?: ReactNode;
  widthDrawer: boolean;
  showLanguage: boolean;
  showOpenDrawer: boolean;
  callbackDrawer?: () => void;
}

export const Header: React.FC<IHeaderProps> = memo(({ menu, widthDrawer, ...rest }) => {
  return (
    <>
      <MdAppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          apiUrl={rest.apiUrl}
          image={rest.image}
          title={rest.title}
          menu={menu}
          showNotification={rest.showNotification}
          showLanguage={rest.showLanguage}
          widthDrawer={widthDrawer}
          showOpenDrawer={rest.showOpenDrawer}
          callbackDrawer={rest.callbackDrawer}
          reactHeader={rest.reactHeader}
        />
      </MdAppBar>
      {widthDrawer && <div style={{ height: '46px' }}></div>}
      <ToolbarProgress />
    </>
  );
});
