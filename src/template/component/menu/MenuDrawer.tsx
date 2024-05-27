import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ProfileRole } from '../../../module/user/profile/component/role/ProfileRole';
import { useAppSelector } from '../../../store/Store';
import { IMenuDto } from '../../dto/menu/MenuDto';

export interface IDrawerProps {
  drawerWidth: number;
  openDrawer: boolean;
  variantDrawer: 'permanent' | 'persistent' | 'temporary';
  menu: IMenuDto[];
  callbackClose?: () => void;
}

export const MenuDrawer: React.FC<IDrawerProps> = memo(
  ({ drawerWidth, openDrawer, variantDrawer, menu, callbackClose }) => {
    const { t } = useTranslation();
    const { getIcon } = useIcon();
    const location = useLocation();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);
    const currentLocation = useMemo(() => location.pathname, [location]);

    const handleClickAway = useCallback(
      (callbackClose?: () => void) => () => {
        callbackClose?.();
      },
      [],
    );

    const isCurrentLocation = useCallback(
      (url: string = '/') => {
        if (url === '/') {
          return currentLocation === '/';
        }
        return currentLocation?.startsWith(url);
      },
      [currentLocation],
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
                      <ListItem
                        key={menu.link}
                        disablePadding
                        className={isCurrentLocation(menu.base) ? 'selected-secondary' : ''}>
                        <ListItemButton onClick={callbackClose} component={Link} to={menu.link}>
                          {menu.icon && <ListItemIcon>{getIcon(menu.icon, 'secondary')}</ListItemIcon>}
                          <ListItemText primary={t(menu.title)} className='text-secondary' />
                        </ListItemButton>
                      </ListItem>
                      {menu.childrens && (
                        <List style={{ marginLeft: '14px' }}>
                          {menu.childrens?.map((child) => (
                            <ProfileRole
                              roles={child.roles}
                              notRoles={child.notRoles}
                              key={menu.title + '-' + child.title}
                              showError={false}>
                              <ListItem
                                disablePadding
                                className={isCurrentLocation(child.link) ? 'selected-primary' : ''}>
                                <ListItemButton onClick={callbackClose} component={Link} to={child.link}>
                                  {menu.icon && <ListItemIcon>{getIcon(child.icon, 'primary')}</ListItemIcon>}
                                  <ListItemText primary={t(child.title)} className='text-primary' />
                                </ListItemButton>
                              </ListItem>
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
