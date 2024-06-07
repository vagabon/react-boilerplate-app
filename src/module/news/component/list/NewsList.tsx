import { memo, useEffect } from 'react';
import { AppInfiniteScrollProvider } from '../../../../app/scroll/component/infinite/provider/AppInfiniteScrollProvider';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import { useFetchNews } from '../../hook/useFetchNews';
import { NewsCardSmall } from '../card/NewsCardSmall';

export interface INewsListProps extends INewsRouterProps {}

export const NewsList: React.FC<INewsListProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const { news, search, count, page, doSearch, doChangePage } = useFetchNews(rest.apiUrl, endPoint, newsAction);

  useEffect(() => {
    doSearch('');
  }, [doSearch]);

  return (
    <AppInfiniteScrollProvider
      icon={endPoint === 'news' ? 'news' : 'blog'}
      title={endPoint === 'news' ? 'NEWS:TITLE' : 'BLOG:TITLE'}
      titleCount={count}
      search={search}
      className='news-list'
      doChangePage={doChangePage(page)}
      doSearch={doSearch}
      urlAdd={'/' + endPoint + '/add'}
      urlAddRole={['ADMIN']}>
      <>
        {news?.map((oneNews: INewsDto) => (
          <NewsCardSmall {...rest} key={'news_' + oneNews.id} news={oneNews} endPoint={endPoint} />
        ))}
      </>
    </AppInfiniteScrollProvider>
  );
});
