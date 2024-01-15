import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import HasRole from '../../../../hook/role/HasRole';
import NewsCard from '../../component/card/NewsCard';
import { useCreateNews } from '../../hook/useCreateNews';

const NewsShowPage: React.FC = () => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews();

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return <HasRole roles={[]}>{id && <NewsCard news={news[parseInt(id)] ?? {}} />}</HasRole>;
};

export default NewsShowPage;
