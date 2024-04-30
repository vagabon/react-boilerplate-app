import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import { I18nUtils, MdDivider, useAppRouter, useAppTranslate, useIcon } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback, useEffect, useState } from 'react';
import { IMenuDto } from '../../../dto/menu/MenuDto';
import HasRole from '../../../hook/role/HasRole';
import { useAuth } from '../../../module/auth/hook/useAuth';

export interface IDrawerProps {
  apiUrl: string;
  drawerWidth: number;
  openDrawer: boolean;
  variantDrawer: 'permanent' | 'persistent' | 'temporary';
  menu: IMenuDto[];
  callbackClose?: () => void;
}

const MenuDrawer: React.FC<IDrawerProps> = memo(
  ({ apiUrl, drawerWidth, openDrawer, variantDrawer, menu, callbackClose }) => {
    const { t } = useAppTranslate();
    const { getIcon } = useIcon();
    const { location } = useAppRouter();
    const { isLoggedIn } = useAuth(apiUrl);
    const [currentLocation, setCurrentLocation] = useState<string>(location.pathname);
    const { Link } = useAppRouter();

    useEffect(() => {
      setCurrentLocation(location.pathname);
    }, [location]);

    const handleClickAway = useCallback(
      (callbackClose?: () => void) => () => {
        callbackClose?.();
      },
      [],
    );

    const isCurrentLocation = useCallback(
      (url: string) => {
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
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}>
          <div style={{ marginTop: '50px' }}></div>
          <Box sx={{ overflow: 'auto' }}>
            {menu?.map((menu) => (
              <List key={menu.title}>
                <HasRole roles={menu.roles} notRroles={menu.notRoles} key={menu.title} showError={false}>
                  {(!menu.notConnected || (menu.notConnected && !isLoggedIn)) && (
                    <>
                      <ListItem
                        key={menu.link}
                        disablePadding
                        className={isCurrentLocation(menu.link) ? 'selected-secondary' : ''}
                        component={Link}
                        to={menu.link}>
                        <ListItemButton onClick={callbackClose}>
                          {menu.icon && <ListItemIcon>{getIcon(menu.icon, 'secondary')}</ListItemIcon>}
                          <ListItemText primary={I18nUtils.translate(t, menu.title)} />
                        </ListItemButton>
                      </ListItem>
                      {menu.childrens && (
                        <List style={{ marginLeft: '14px' }}>
                          {menu.childrens?.map((child) => (
                            <HasRole
                              roles={child.roles}
                              notRroles={child.notRoles}
                              key={menu.title + '-' + child.title}
                              showError={false}>
                              <ListItem
                                disablePadding
                                className={isCurrentLocation(child.link) ? 'selected-primary' : ''}
                                component={Link}
                                to={child.link}>
                                <ListItemButton onClick={callbackClose}>
                                  {menu.icon && <ListItemIcon>{getIcon(child.icon, 'primary')}</ListItemIcon>}
                                  <ListItemText primary={I18nUtils.translate(t, child.title)} />
                                </ListItemButton>
                              </ListItem>
                            </HasRole>
                          ))}
                        </List>
                      )}
                      <MdDivider />
                    </>
                  )}
                </HasRole>
              </List>
            ))}
          </Box>
        </Drawer>
      </ClickAwayListener>
    );
  },
);

export default MenuDrawer;
