import { memo } from 'react';
import { AppContent } from '../../../../app/content/AppContent';
import { HasRole } from '../../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { INewsRouterProps } from '../../NewsRouter';
import { NewsList } from '../../component/list/NewsList';

export interface INewsListPageProps extends INewsRouterProps, IBaseCustomSeoProps {}

export const NewsListPage: React.FC<INewsListPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  return (
    <AppContent {...rest} className='no-overflow' seo='SEO:NEWS'>
      <HasRole roles={[]}>
        <NewsList {...rest} endPoint={endPoint} newsAction={newsAction} />
      </HasRole>
    </AppContent>
  );
});
