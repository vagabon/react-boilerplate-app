import { lazy, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppSuspenceLoader } from '../../app/suspence/component/AppSuspenceLoader';
import { IHeaderDto } from '../../template/dto/HeaderDto';
import { IAdminTabConfDto } from './dto/AdminConfDto';

const AdminShowPage = lazy(() =>
  import('./page/show/AdminShowPage').then((module) => ({ default: module.AdminShowPage })),
);
const AdminTabsPage = lazy(() =>
  import('./page/tab/AdminTabPage').then((module) => ({ default: module.AdminTabPage })),
);
const NotFoundPage = lazy(() =>
  import('../not-found/page/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

interface IAdminRouterProps extends IHeaderDto {
  website: string;
  conf: IAdminTabConfDto;
}

export const AdminRouter: React.FC<IAdminRouterProps> = memo(({ ...rest }) => {
  return (
    <Routes>
      <Route>
        <Route path='/tab/:tab' element={AppSuspenceLoader(<AdminTabsPage {...rest} />)} />
        <Route path='/update/:page/:id' element={AppSuspenceLoader(<AdminShowPage {...rest} />)} />
        <Route path='*' element={AppSuspenceLoader(<NotFoundPage {...rest} />)}></Route>
      </Route>
    </Routes>
  );
});
