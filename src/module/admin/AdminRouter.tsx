import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IHeaderProp } from '../../template/Header';
import NotFoundPage from '../not-found/page/NotFoundPage';
import { IAdminTabConfDto } from './dto/AdminConfDto';
import AdminShowPage from './page/show/AdminShowPage';
import AdminTabsPage from './page/tab/AdminTabPage';

interface IAdminRouterProps extends IHeaderProp {
  website: string;
  conf: IAdminTabConfDto;
}

const AdminRouter: React.FC<IAdminRouterProps> = memo(({ ...rest }) => {
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
});

export default AdminRouter;
