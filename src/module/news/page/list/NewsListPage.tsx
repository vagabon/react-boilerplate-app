import HasRole from '../../../../hook/role/HasRole';
import CustomSeo from '../../../custom/seo/Seo';
import { INewsRouterProps } from '../../NewsRouter';
import NewsList from '../../component/list/NewsList';

export interface INewsListPageProps extends INewsRouterProps {}

const NewsListPage: React.FC<INewsListPageProps> = ({ endPoint, newsAction }) => {
  return (
    <HasRole roles={[]}>
      <CustomSeo
        title={'News'}
        description={'Vagabond Blog and Tools about React,Java,Quakus technologies for all developers.'}
      />
      <NewsList endPoint={endPoint} newsAction={newsAction} />
    </HasRole>
  );
};

export default NewsListPage;
