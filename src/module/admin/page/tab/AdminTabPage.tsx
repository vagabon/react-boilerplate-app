import { MdTabs, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback, useEffect, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { IHeaderProp } from '../../../../template/Header';
import AdminTable from '../../component/AdminTable';
import { IAdminTabConfDto } from '../../dto/AdminConfDto';

interface IAdminTabsPageProps extends IHeaderProp {
  conf: IAdminTabConfDto;
}

const AdminTabsPage: React.FC<IAdminTabsPageProps> = memo(({ conf, ...rest }) => {
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
    <AppContent {...rest} className='admin' seo='SEO:ADMIN'>
      <HasRole roles={['ADMIN']}>
        {activeTab && <MdTabs value={activeTab} callback={handleChange} tabs={conf.tabs} />}
        {activeTab && <AdminTable {...rest} activePage={activeTab} conf={conf} />}
      </HasRole>
    </AppContent>
  );
});

export default AdminTabsPage;
