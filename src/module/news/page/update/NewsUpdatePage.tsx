import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HasRole from '../../../../hook/role/HasRole';
import NewsForm from '../../component/form/NewsForm';
import { useCreateNews } from '../../hook/useCreateNews';

const NewsUpdatePage: React.FC = () => {
  const params = useParams();
  const { fetchById } = useCreateNews();

  useEffect(() => {
    fetchById(params.id);
  }, [params.id, fetchById]);

  return (
    <HasRole roles={['ADMIN']}>
      <NewsForm />
    </HasRole>
  );
};

export default NewsUpdatePage;
