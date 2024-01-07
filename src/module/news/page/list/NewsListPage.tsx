import HasRole from '../../../../hook/role/HasRole';
import NewsList from '../../component/list/NewsList';

const NewsListPage: React.FC = () => {
  return (
    <HasRole roles={[]}>
      <NewsList />
    </HasRole>
  );
};

export default NewsListPage;
