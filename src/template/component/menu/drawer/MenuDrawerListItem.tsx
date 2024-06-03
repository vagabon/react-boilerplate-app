import { MdListItem } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItem';
import clsx from 'clsx';
import { PropsWithChildren, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface IMenuDrawerListItemProps extends PropsWithChildren {
  className?: string;
  link?: string;
  level?: number;
}

export const MenuDrawerListItem: React.FC<IMenuDrawerListItemProps> = memo(
  ({ className = '', level = 1, link = '/', children }) => {
    const location = useLocation();
    const currentLocation = useMemo(() => location.pathname, [location.pathname]);

    const isCurrentLocation = useMemo(() => {
      if (link === '/') {
        return currentLocation === '/';
      }
      return currentLocation?.startsWith(link);
    }, [link, currentLocation]);

    return (
      <MdListItem
        disablePadding
        className={clsx(
          isCurrentLocation && 'font-weight-450',
          isCurrentLocation && level === 1 && 'text-underline',
          isCurrentLocation && level === 2 && 'text-black',
          !isCurrentLocation && level === 2 && 'text-grey',
          className,
        )}>
        {children}
      </MdListItem>
    );
  },
);
