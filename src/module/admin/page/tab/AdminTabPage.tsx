import { MdTabs } from '@vagabond-inc/react-boilerplate-md/dist/md/component/tabs/MdTabs';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../../../app/content/component/AppContent';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { ProfileRole } from '../../../user/profile/component/role/ProfileRole';
import { AdminTable } from '../../component/AdminTable';
import { IAdminTabConfDto } from '../../dto/AdminConfDto';

interface IAdminTabsPageProps extends IHeaderDto {
  conf: IAdminTabConfDto;
}

export const AdminTabPage: React.FC<IAdminTabsPageProps> = memo(({ conf, ...rest }) => {
  const { navigate } = useAppRouter();
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    setActiveTab(tab ?? conf.tabs[0].name);
  }, [tab, conf]);

  const handleChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab);
      navigate('/admin/tab/' + newTab);
    },
    [navigate],
  );

  return (
    <AppContent {...rest} className='admin' seo='SEO:ADMIN'>
      <ProfileRole roles={['ADMIN']}>
        {activeTab && <MdTabs value={activeTab} callback={handleChange} tabs={conf.tabs} />}
        {activeTab && <AdminTable {...rest} activePage={activeTab} conf={conf} />}
      </ProfileRole>
    </AppContent>
  );
});
