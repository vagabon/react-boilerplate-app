import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import HasRole from '../../../../hook/role/HasRole';
import CustomSeo, { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import NewsCard from '../../component/card/NewsCard';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps, IBaseCustomSeoProps {}

const NewsShowPage: React.FC<INewsShowPageProps> = ({ endPoint, newsAction, ...rest }) => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews(rest.apiUrl, endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <HasRole roles={[]}>
      <CustomSeo {...rest} title={news.title} description={news.description} image={news.image} />
      {id && <NewsCard {...rest} news={news ?? {}} endPoint={endPoint} />}
    </HasRole>
  );
};

export default NewsShowPage;
