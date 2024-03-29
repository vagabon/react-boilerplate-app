import { MdTabs, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import AdminTable from '../../component/AdminTable';
import { IAdminTabConfDto } from '../../dto/AdminConfDto';

interface IAdminTabsPageProps extends IBaseCustomSeoProps {
  conf: IAdminTabConfDto;
}

const AdminTabsPage: React.FC<IAdminTabsPageProps> = ({ conf, ...rest }) => {
  const {
    navigate,
    params: { tab },
  } = useAppRouter();
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
    <AppContent {...rest} className='admin' seoTitle='SEO:ADMIN.TITLE' seoDescription='SEO:ADMIN.DESCRIPTION'>
      <HasRole roles={['ADMIN']}>
        {activeTab && <MdTabs value={activeTab} callback={handleChange} tabs={conf.tabs} />}
        {activeTab && <AdminTable {...rest} activePage={activeTab} conf={conf} />}
      </HasRole>
    </AppContent>
  );
};

export default AdminTabsPage;
