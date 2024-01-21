import { useEffect } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import { useFetchNews } from '../../hook/useFetchNews';
import NewsCardSmall from '../card/NewsCardSmall';

export interface INewsListProps extends INewsRouterProps {}

const NewsList: React.FC<INewsListProps> = ({ endPoint, newsAction }) => {
  const { news, search, page, doSearch, doChangePage } = useFetchNews(endPoint, newsAction);

  useEffect(() => {
    doSearch('');
  }, [doSearch]);

  return (
    <InfiniteScrollPage
      search={search}
      className='news-list'
      doChangePage={doChangePage(page)}
      doSearch={doSearch}
      urlAdd={'/' + endPoint + '/add'}
      urlAddRole={['ADMIN']}>
      <>
        {news.map((oneNews: INewsDto) => (
          <NewsCardSmall key={'news_' + oneNews.id} news={oneNews} endPoint={endPoint} />
        ))}
      </>
    </InfiniteScrollPage>
  );
};

export default NewsList;
