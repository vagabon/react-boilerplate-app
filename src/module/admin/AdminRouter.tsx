import { Navigate, Route, Routes } from 'react-router-dom';
import { IBaseCustomSeoProps } from '../custom/seo/component/CustomSeo';
import NotFoundPage from '../not-found/page/NotFoundPage';
import { IAdminTabConfDto } from './dto/AdminConfDto';
import AdminShowPage from './page/show/AdminShowPage';
import AdminTabsPage from './page/tab/AdminTabPage';

interface IAdminRouterProps extends IBaseCustomSeoProps {
  apiUrl: string;
  website: string;
  emailContact: string;
  conf: IAdminTabConfDto;
}

const AdminRouter: React.FC<IAdminRouterProps> = ({ ...rest }) => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Navigate to='/admin/tab/user' />} />
        <Route path='/tab/:tab' element={<AdminTabsPage {...rest} />} />
        <Route path='/update/:page/:id' element={<AdminShowPage {...rest} />} />
        <Route path='*' element={<NotFoundPage {...rest} />}></Route>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
