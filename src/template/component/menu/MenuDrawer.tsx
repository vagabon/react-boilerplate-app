import { Box, ClickAwayListener, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { useTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useTranslate';
import { memo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProfileRole } from '../../../module/user/profile/component/role/ProfileRole';
import { useAppSelector } from '../../../store/Store';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { MenuDrawerListItem } from './MenuDrawerListItem';

export interface IDrawerProps {
  drawerWidth: number;
  openDrawer: boolean;
  variantDrawer: 'permanent' | 'persistent' | 'temporary';
  menu: IMenuDto[];
  callbackClose?: () => void;
}

export const MenuDrawer: React.FC<IDrawerProps> = memo(
  ({ drawerWidth, openDrawer, variantDrawer, menu, callbackClose }) => {
    const { translate } = useTranslate();
    const { getIcon } = useIcon();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);

    const handleClickAway = useCallback(
      (callbackClose?: () => void) => () => {
        callbackClose?.();
      },
      [],
    );

    return (
      <ClickAwayListener onClickAway={handleClickAway(callbackClose)}>
        <Drawer
          open={openDrawer}
          variant={variantDrawer}
          onClose={handleClickAway(callbackClose)}
          anchor='left'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, top: '46px', boxSizing: 'border-box' },
          }}>
          <Box
            sx={{
              overflow: 'auto',
            }}>
            {menu?.map((menu) => (
              <List key={menu.title}>
                <ProfileRole roles={menu.roles} notRoles={menu.notRoles} key={menu.title} showError={false}>
                  {(!menu.notConnected || (menu.notConnected && !isLoggedIn)) && (
                    <>
                      <MenuDrawerListItem key={menu.link} link={menu.base}>
                        <ListItemButton onClick={callbackClose} component={Link} to={menu.link}>
                          {menu.icon && <ListItemIcon>{getIcon(menu.icon, 'secondary')}</ListItemIcon>}
                          <ListItemText primary={translate(menu.title)} className='text-secondary' />
                        </ListItemButton>
                      </MenuDrawerListItem>
                      {menu.childrens && (
                        <List style={{ marginLeft: '14px' }}>
                          {menu.childrens?.map((child) => (
                            <ProfileRole
                              roles={child.roles}
                              notRoles={child.notRoles}
                              key={menu.title + '-' + child.title}
                              showError={false}>
                              <MenuDrawerListItem link={child.link}>
                                <ListItemButton onClick={callbackClose} component={Link} to={child.link}>
                                  {menu.icon && <ListItemIcon>{getIcon(child.icon, 'primary')}</ListItemIcon>}
                                  <ListItemText primary={translate(child.title)} className='text-primary' />
                                </ListItemButton>
                              </MenuDrawerListItem>
                            </ProfileRole>
                          ))}
                        </List>
                      )}
                      <MdDivider />
                    </>
                  )}
                </ProfileRole>
              </List>
            ))}
          </Box>
        </Drawer>
      </ClickAwayListener>
    );
  },
);
