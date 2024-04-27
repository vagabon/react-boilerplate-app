import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { INewsRouterProps } from '../../NewsRouter';
import NewsCard from '../../component/card/NewsCard';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps {}

const NewsShowPage: React.FC<INewsShowPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews(rest.apiUrl, endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <HasRole roles={[]}>
      <AppContent id={id} className='mardown-with-summary' seo='SEO:NEWS.TITLE' {...rest}>
        {id && <NewsCard {...rest} news={news ?? {}} endPoint={endPoint} />}
      </AppContent>
    </HasRole>
  );
});

export default NewsShowPage;
