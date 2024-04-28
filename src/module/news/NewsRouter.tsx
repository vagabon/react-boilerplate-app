import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IReducersActionsProps } from '../../reducer/BaseReducer';
import { IHeaderProp } from '../../template/Header';
import NotFoundPage from '../not-found/page/NotFoundPage';
import NewsListPage from './page/list/NewsListPage';
import NewsShowPage from './page/show/NewsShowPage';
import NewsUpdatePage from './page/update/NewsUpdatePage';

export interface INewsRouterProps extends IHeaderProp {
  endPoint: string;
  newsAction: IReducersActionsProps;
}

const NewsRouter: React.FC<INewsRouterProps> = memo(({ ...rest }) => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<NewsListPage {...rest} />} />
        <Route path='/show/:id' element={<NewsShowPage {...rest} />} />
        <Route path='/show/:id/:page' element={<NewsShowPage {...rest} />} />
        <Route path='/add' element={<NewsUpdatePage {...rest} />} />
        <Route path='/update/:id' element={<NewsUpdatePage {...rest} />} />
        <Route path='*' element={<NotFoundPage {...rest} />}></Route>
      </Route>
    </Routes>
  );
});

export default NewsRouter;
