import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdBox } from '@vagabond-inc/react-boilerplate-md/dist/md/component/box/MdBox';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { MdDrawer } from '@vagabond-inc/react-boilerplate-md/dist/md/component/drawer/MdDrawer';
import { MdList } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdList';
import { MdListItemButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemButton';
import { MdListItemIcon } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemIcon';
import { MdListItemText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemText';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProfileRole } from '../../../../module/user/profile/component/role/ProfileRole';
import { useAppSelector } from '../../../../store/Store';
import { IMenuDto } from '../../../dto/menu/MenuDto';
import { useTemplateDrawer } from '../../../hook/useTemplateDrawer';
import { Language } from '../../language/Language';
import { ToolbarTheme } from '../../toolbar/theme/ToolbarTheme';
import { MenuDrawerListItem } from './MenuDrawerListItem';

export interface IDrawerProps {
  menu: IMenuDto[];
  showLanguage: boolean;
}

export const MenuDrawer: React.FC<IDrawerProps> = memo(({ menu, showLanguage }) => {
  const open = useAppSelector((state) => state.common.drawer.open, shallowEqual);
  const variant = useAppSelector((state) => state.common.drawer.variant, shallowEqual);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);
  const { handleSwitchDrawer } = useTemplateDrawer();
  const { getIcon } = useIcon();

  return (
    <MdDrawer open={open} variant={variant} callbackClose={handleSwitchDrawer(true)} anchor='left'>
      <MdBox className='flex overflow-auto height100 space-between'>
        <div>
          {menu?.map((menu) => (
            <MdList key={menu.title}>
              <ProfileRole roles={menu.roles} notRoles={menu.notRoles} key={menu.title} showError={false}>
                {(!menu.notConnected || (menu.notConnected && !isLoggedIn)) && (
                  <>
                    <MenuDrawerListItem key={menu.link} link={menu.base}>
                      <MdListItemButton
                        className='gap10'
                        onClick={handleSwitchDrawer(true)}
                        component={Link}
                        to={menu.link}>
                        {menu.icon && (
                          <MdListItemIcon className='text-black'>{getIcon(menu.icon, 'inherit')} </MdListItemIcon>
                        )}
                        <MdListItemText content={menu.title} className='text-black font-weight-450' />
                      </MdListItemButton>
                    </MenuDrawerListItem>
                    {menu.childrens && (
                      <MdList className='margin-left15'>
                        {menu.childrens?.map((child) => (
                          <ProfileRole
                            roles={child.roles}
                            notRoles={child.notRoles}
                            key={menu.title + '-' + child.title}
                            showError={false}>
                            <MenuDrawerListItem level={2} className='height-36' link={child.link}>
                              <MdListItemButton
                                className='gap10 height-36'
                                onClick={handleSwitchDrawer(true)}
                                component={Link}
                                to={child.link}>
                                {child.icon && <MdListItemIcon>{getIcon(child.icon, 'inherit')}</MdListItemIcon>}
                                <MdListItemText content={child.title} />
                              </MdListItemButton>
                            </MenuDrawerListItem>
                          </ProfileRole>
                        ))}
                      </MdList>
                    )}
                    <MdDivider />
                  </>
                )}
              </ProfileRole>
            </MdList>
          ))}
        </div>
        <div>
          <MdDivider />
          <div className='flex-row align-center height50px'>
            <div className={(showLanguage ? 'width50 ' : 'width100 ') + 'flex align-center justify-center'}>
              <ToolbarTheme />
            </div>
            {showLanguage && (
              <div className='flex width50 align-center justify-center padding-10'>
                <Language fullWidth />
              </div>
            )}
          </div>
        </div>
      </MdBox>
    </MdDrawer>
  );
});
