import { ListItem } from '@mui/material';
import { PropsWithChildren, memo, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface IMenuDrawerListItemProps extends PropsWithChildren {
  link?: string;
}

export const MenuDrawerListItem: React.FC<IMenuDrawerListItemProps> = memo(({ link, children }) => {
  const location = useLocation();
  const currentLocation = useMemo(() => location.pathname, [location.pathname]);

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
    <ListItem disablePadding className={isCurrentLocation(link) ? 'selected-secondary' : ''}>
      {children}
    </ListItem>
  );
});
