import { Route, Routes } from 'react-router-dom';
import { IAdminTabConfDto } from './dto/AdminConfDto';
import AdminShowPage from './page/show/AdminShowPage';
import AdminTabsPage from './page/tab/AdminTabPage';

interface IAdminRouterProps {
  conf: IAdminTabConfDto;
}

const AdminRouter: React.FC<IAdminRouterProps> = ({ conf }) => {
  return (
    <Routes>
      <Route>
        <Route path='/tab/:tab' element={<AdminTabsPage conf={conf} />} />
        <Route path='/update/:page/:id' element={<AdminShowPage conf={conf} />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
