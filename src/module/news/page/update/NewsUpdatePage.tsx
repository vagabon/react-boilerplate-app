import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import HasRole from '../../../../hook/role/HasRole';
import NewsForm from '../../component/form/NewsForm';
import { useCreateNews } from '../../hook/useCreateNews';

const NewsUpdatePage: React.FC = () => {
  const {
    params: { id },
  } = useAppRouter();
  const { fetchById } = useCreateNews();

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return <HasRole roles={['ADMIN']}>{id && <NewsForm idNews={parseInt(id)} />}</HasRole>;
};

export default NewsUpdatePage;
