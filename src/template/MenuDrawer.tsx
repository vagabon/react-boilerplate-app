import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { MdDivider, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import { IMenuDto } from '../dto/menu/MenuDto';
import HasRole from '../hook/role/HasRole';

export interface IDrawerProps {
  drawerWidth: number;
  openDrawer: boolean;
  variantDrawer: 'permanent' | 'persistent' | 'temporary';
  menu: IMenuDto[];
  callbackClose?: () => void;
}

const MenuDrawer: React.FC<IDrawerProps> = ({ drawerWidth, openDrawer, variantDrawer, menu, callbackClose }) => {
  const { location, handleNavigate } = useAppRouter();
  const [currentLocation, setCurrentLocation] = useState<string>(location.pathname);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        <div style={{ marginTop: '50px' }}></div>
        <Box sx={{ overflow: 'auto' }}>
          {menu?.map((menu) => (
            <List key={menu.title}>
              <HasRole roles={menu.roles} key={menu.title} showError={false}>
                <ListItem key={menu.link} disablePadding>
                  <ListItemButton onClick={handleNavigate(menu.link, callbackClose)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={menu.title} />
                  </ListItemButton>
                </ListItem>
                {menu.childrens && (
                  <List style={{ marginLeft: '14px' }}>
                    {menu.childrens?.map((child) => (
                      <HasRole roles={child.roles} key={child.title} showError={false}>
                        <ListItem disablePadding>
                          <ListItemButton onClick={handleNavigate(child.link, callbackClose)}>
                            <ListItemIcon>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={child.title} />
                          </ListItemButton>
                        </ListItem>
                      </HasRole>
                    ))}
                  </List>
                )}
                <MdDivider />
              </HasRole>
            </List>
          ))}
        </Box>
      </Drawer>
    </ClickAwayListener>
  );
};

export default MenuDrawer;
