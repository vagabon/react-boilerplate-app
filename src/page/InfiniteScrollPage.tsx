import { MdSearchBar } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, useCallback } from 'react';
import AppFabAdd, { IAppFabAddProps } from '../app/fab/add/AppFabAdd';
import AppInfiniteScrool from '../app/infinite-scroll/AppInfiniteScrool';

export interface InfiniteScroolPageProps extends IAppFabAddProps {
  className?: string;
  search?: string;
  children: ReactNode;
  doChangePage?: (pageToAdd: number) => void;
  doSearch?: (search: string) => void;
}

const InfiniteScrollPage: React.FC<InfiniteScroolPageProps> = (props: InfiniteScroolPageProps) => {
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
      {props.search !== undefined && <MdSearchBar callBack={handleSearch(props.doSearch)} search={props.search} />}
      <AppInfiniteScrool id='infinite-container' callBack={onScroll(props.doChangePage)} className={props.className}>
        {props.children}
      </AppInfiniteScrool>
      <AppFabAdd {...props} />
    </>
  );
};

export default InfiniteScrollPage;
