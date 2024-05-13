import { memo, useEffect } from 'react';
import { InfiniteScrollPage } from '../../../../page/InfiniteScrollPage';
import { CustomSeo, IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import { INewsDto } from '../../dto/NewsDto';
import { useFetchNews } from '../../hook/useFetchNews';
import { NewsCardSmall } from '../card/NewsCardSmall';

export interface INewsListProps extends INewsRouterProps, IBaseCustomSeoProps {}

export const NewsList: React.FC<INewsListProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const { news, search, count, page, doSearch, doChangePage } = useFetchNews(rest.apiUrl, endPoint, newsAction);

  useEffect(() => {
    doSearch('');
  }, [doSearch]);

  return (
    <>
      <CustomSeo
        {...rest}
        title={news?.[0]?.title ?? 'News'}
        description={
          news?.[0]?.resume ?? 'Vagabond Blog and Tools about React,Java,Quakus technologies for all developers.'
        }
        image={news?.[0]?.image}
        date={news?.[0]?.creationDate}
      />
      <InfiniteScrollPage
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
          {news.map((oneNews: INewsDto) => (
            <NewsCardSmall {...rest} key={'news_' + oneNews.id} news={oneNews} endPoint={endPoint} />
          ))}
        </>
      </InfiniteScrollPage>
    </>
  );
});
