import { memo } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import NewsList from '../../component/list/NewsList';

export interface INewsListPageProps extends INewsRouterProps, IBaseCustomSeoProps {}

const NewsListPage: React.FC<INewsListPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  return (
    <AppContent {...rest} className='no-overflow' seoTitle='SEO:NEWS.TITLE' seoDescription='SEO:NEWS.DESCRIPTION'>
      <HasRole roles={[]}>
        <NewsList {...rest} endPoint={endPoint} newsAction={newsAction} />
      </HasRole>
    </AppContent>
  );
});

export default NewsListPage;
