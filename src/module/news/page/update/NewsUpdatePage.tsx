import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import HasRole from '../../../../hook/role/HasRole';
import CustomSeo from '../../../custom/seo/Seo';
import { INewsRouterProps } from '../../NewsRouter';
import NewsForm from '../../component/form/NewsForm';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps {}

const NewsUpdatePage: React.FC<INewsShowPageProps> = ({ endPoint, newsAction }) => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews(endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <>
      <CustomSeo title={news.title} description={news.resume} />
      <HasRole roles={['ADMIN']}>{<NewsForm endPoint={endPoint} newsAction={newsAction} news={news ?? {}} />}</HasRole>
    </>
  );
};

export default NewsUpdatePage;
