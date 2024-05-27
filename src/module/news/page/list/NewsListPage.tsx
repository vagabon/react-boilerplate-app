import { memo } from 'react';
import { AppContent } from '../../../../app/content/component/AppContent';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { ProfileRole } from '../../../user/profile/component/role/ProfileRole';
import { INewsRouterProps } from '../../NewsRouter';
import { NewsList } from '../../component/list/NewsList';

export interface INewsListPageProps extends INewsRouterProps, IBaseCustomSeoProps {}

export const NewsListPage: React.FC<INewsListPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  return (
    <AppContent {...rest} className='no-overflow' seo='SEO:NEWS'>
      <ProfileRole roles={[]}>
        <NewsList {...rest} endPoint={endPoint} newsAction={newsAction} />
      </ProfileRole>
    </AppContent>
  );
});
