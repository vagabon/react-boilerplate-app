import HasRole from '../../../../hook/role/HasRole';
import { INewsRouterProps } from '../../NewsRouter';
import NewsList from '../../component/list/NewsList';

export interface INewsListPageProps extends INewsRouterProps {}

const NewsListPage: React.FC<INewsListPageProps> = ({ endPoint, newsAction }) => {
  return (
    <HasRole roles={[]}>
      <NewsList endPoint={endPoint} newsAction={newsAction} />
    </HasRole>
  );
};

export default NewsListPage;
