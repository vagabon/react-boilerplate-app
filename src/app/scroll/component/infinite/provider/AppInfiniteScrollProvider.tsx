import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdSearchBar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/searchbar/MdSearchBar';
import React, { ReactNode, memo, useCallback } from 'react';
import { AppFabAdd, IAppFabAddProps } from '../../../../button/component/fab/add/AppFabAdd';
import { AppInfiniteScroll } from '../AppInfiniteScroll';

export interface IAppInfiniteScrollProviderProps extends IAppFabAddProps {
  icon?: string;
  title?: string;
  titleCount?: number;
  className?: string;
  search?: string;
  isCard?: boolean;
  children: ReactNode;
  doChangePage?: (pageToAdd: number) => void;
  doSearch?: (search: string) => void;
}

export const AppInfiniteScrollProvider: React.FC<IAppInfiniteScrollProviderProps> = memo(
  ({ icon, title, titleCount, className, isCard = true, ...rest }) => {
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
        {rest.search !== undefined && (
          <>
            {isCard ? (
              <MdCard className='search-bar-card' icon={icon} title={title} titleCount={titleCount}>
                <MdSearchBar callBack={handleSearch(rest.doSearch)} search={rest.search} />
              </MdCard>
            ) : (
              <MdSearchBar callBack={handleSearch(rest.doSearch)} search={rest.search} />
            )}
          </>
        )}
        <AppInfiniteScroll id='infinite-container' callBack={onScroll(rest.doChangePage)} className={className}>
          {rest.children}
        </AppInfiniteScroll>
        <AppFabAdd {...rest} />
      </>
    );
  },
);
