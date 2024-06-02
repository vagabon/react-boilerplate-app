import { MdListItem } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItem';
import { PropsWithChildren, memo, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface IMenuDrawerListItemProps extends PropsWithChildren {
  className?: string;
  link?: string;
}

export const MenuDrawerListItem: React.FC<IMenuDrawerListItemProps> = memo(({ className = '', link, children }) => {
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
    <MdListItem
      disablePadding
      className={(isCurrentLocation(link) ? 'font-weight-450 text-underline' : '') + className}>
      {children}
    </MdListItem>
  );
});
