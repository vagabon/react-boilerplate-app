import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { INewsRouterProps } from '../../NewsRouter';
import NewsForm from '../../component/form/NewsForm';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps {}

const NewsUpdatePage: React.FC<INewsShowPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews(rest.apiUrl, endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <AppContent {...rest} id='news-form' className='markdown-form' seo='SEO:NEWS'>
      <HasRole roles={['ADMIN']}>
        {<NewsForm {...rest} endPoint={endPoint} newsAction={newsAction} news={news ?? {}} />}
      </HasRole>
    </AppContent>
  );
});

export default NewsUpdatePage;
