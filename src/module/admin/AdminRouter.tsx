import { lazy, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SuspenceLoader } from '../../suspence/SuspenceLoader';
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
        <Route path='/tab/:tab' element={SuspenceLoader(<AdminTabsPage {...rest} />)} />
        <Route path='/update/:page/:id' element={SuspenceLoader(<AdminShowPage {...rest} />)} />
        <Route path='*' element={SuspenceLoader(<NotFoundPage {...rest} />)}></Route>
      </Route>
    </Routes>
  );
});
