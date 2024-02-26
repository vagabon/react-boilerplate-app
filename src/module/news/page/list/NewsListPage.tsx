import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { INewsRouterProps } from '../../NewsRouter';
import NewsList from '../../component/list/NewsList';

export interface INewsListPageProps extends INewsRouterProps {}

const NewsListPage: React.FC<INewsListPageProps> = ({ endPoint, newsAction }) => {
  return (
    <AppContent className='no-overflow'>
      <HasRole roles={[]}>
        <NewsList endPoint={endPoint} newsAction={newsAction} />
      </HasRole>
    </AppContent>
  );
};

export default NewsListPage;
