import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect } from 'react';
import HasRole from '../../../../hook/role/HasRole';
import CustomSeo, { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import NewsForm from '../../component/form/NewsForm';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps, IBaseCustomSeoProps {}

const NewsUpdatePage: React.FC<INewsShowPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews(rest.apiUrl, endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <>
      <CustomSeo {...rest} title={news.title} description={news.resume} image={news.image} />
      <HasRole roles={['ADMIN']}>
        {<NewsForm {...rest} endPoint={endPoint} newsAction={newsAction} news={news ?? {}} />}
      </HasRole>
    </>
  );
});

export default NewsUpdatePage;
