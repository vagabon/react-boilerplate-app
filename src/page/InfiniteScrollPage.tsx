import { MdCard, MdSearchBar } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, useCallback } from 'react';
import AppFabAdd, { IAppFabAddProps } from '../app/fab/add/AppFabAdd';
import AppInfiniteScrool from '../app/infinite-scroll/AppInfiniteScrool';

export interface InfiniteScroolPageProps extends IAppFabAddProps {
  icon?: string;
  title?: string;
  titleCount?: number;
  className?: string;
  search?: string;
  children: ReactNode;
  doChangePage?: (pageToAdd: number) => void;
  doSearch?: (search: string) => void;
}

const InfiniteScrollPage: React.FC<InfiniteScroolPageProps> = ({
  icon,
  title,
  titleCount,
  className = '',
  ...props
}) => {
  const handleSearch = useCallback(
    (callback?: (search: string) => void) => (search: string) => {
      callback?.(search);
    },
    [],
  );

  const onScroll = useCallback(
    (callback?: (pageToAdd: number) => void) => () => {
      callback?.(1);
    },
    [],
  );

  return (
    <>
      {props.search !== undefined && (
        <MdCard className='search-bar-card' icon={icon} title={title} titleCount={titleCount}>
          <MdSearchBar callBack={handleSearch(props.doSearch)} search={props.search} />
        </MdCard>
      )}
      <AppInfiniteScrool id='infinite-container' callBack={onScroll(props.doChangePage)} className={className}>
        {props.children}
      </AppInfiniteScrool>
      <AppFabAdd {...props} />
    </>
  );
};

export default InfiniteScrollPage;
