import { useEffect } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import { INewsDto } from '../../dto/NewsDto';
import { useFetchNews } from '../../hook/useFetchNews';
import NewsCardSmall from '../card/NewsCardSmall';

const NewsList: React.FC = () => {
  const { news, search, page, doSearch, doChangePage } = useFetchNews();

  useEffect(() => {
    doSearch('');
  }, [doSearch]);

  return (
    <InfiniteScrollPage
      search={search}
      className='news-list'
      doChangePage={doChangePage(page)}
      doSearch={doSearch}
      urlAdd='/news/add'
      urlAddRole={['ADMIN']}>
      <>
        {news.map((oneNews: INewsDto) => (
          <NewsCardSmall key={'news_' + oneNews.id} news={oneNews} />
        ))}
      </>
    </InfiniteScrollPage>
  );
};

export default NewsList;
