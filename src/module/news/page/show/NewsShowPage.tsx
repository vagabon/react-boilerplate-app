import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HasRole from '../../../../hook/role/HasRole';
import NewsCard from '../../component/card/NewsCard';
import { useCreateNews } from '../../hook/useCreateNews';

const NewsShowPage: React.FC = () => {
  const params = useParams();
  const { news, fetchById } = useCreateNews();

  useEffect(() => {
    fetchById(params.id);
  }, [params.id, fetchById]);

  return (
    <HasRole roles={[]}>
      <NewsCard news={news} />
    </HasRole>
  );
};

export default NewsShowPage;
