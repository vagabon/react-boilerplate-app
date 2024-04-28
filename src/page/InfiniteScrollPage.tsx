import { MdCard, MdSearchBar } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, memo, useCallback } from 'react';
import AppFabAdd, { IAppFabAddProps } from '../app/fab/add/AppFabAdd';
import AppInfiniteScrool from '../app/infinite-scroll/AppInfiniteScrool';

export interface InfiniteScroolPageProps extends IAppFabAddProps {
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

const InfiniteScrollPage: React.FC<InfiniteScroolPageProps> = memo(
  ({ icon, title, titleCount, className, isCard, ...rest }) => {
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
        <AppInfiniteScrool id='infinite-container' callBack={onScroll(rest.doChangePage)} className={className}>
          {rest.children}
        </AppInfiniteScrool>
        <AppFabAdd {...rest} />
      </>
    );
  },
);

InfiniteScrollPage.defaultProps = {
  isCard: true,
};

export default InfiniteScrollPage;
