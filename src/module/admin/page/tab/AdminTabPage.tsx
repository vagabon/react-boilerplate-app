import { MdTabs, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import AdminTable from '../../component/AdminTable';
import { IAdminTabConfDto } from '../../dto/AdminConfDto';

interface IAdminTabsPageProps {
  conf: IAdminTabConfDto;
}

const AdminTabsPage: React.FC<IAdminTabsPageProps> = ({ conf }) => {
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
    <AppContent className='margin-10 flex1'>
      <HasRole roles={['ADMIN']}>
        {activeTab && <MdTabs value={activeTab} callback={handleChange} tabs={conf.tabs} />}
        {activeTab && <AdminTable activePage={activeTab} conf={conf} />}
      </HasRole>
    </AppContent>
  );
};

export default AdminTabsPage;
