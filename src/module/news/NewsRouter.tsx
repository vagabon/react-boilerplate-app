import { Route, Routes } from 'react-router-dom';
import { IReducersActionsProps } from '../../reducer/BaseReducer';
import { IBaseCustomSeoProps } from '../custom/seo/component/CustomSeo';
import NotFoundPage from '../not-found/page/NotFoundPage';
import NewsListPage from './page/list/NewsListPage';
import NewsShowPage from './page/show/NewsShowPage';
import NewsUpdatePage from './page/update/NewsUpdatePage';

export interface INewsRouterProps extends IBaseCustomSeoProps {
  endPoint: string;
  newsAction: IReducersActionsProps;
}

const NewsRouter: React.FC<INewsRouterProps> = ({ ...props }) => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<NewsListPage {...props} />} />
        <Route path='/show/:id' element={<NewsShowPage {...props} />} />
        <Route path='/show/:id/:page' element={<NewsShowPage {...props} />} />
        <Route path='/add' element={<NewsUpdatePage {...props} />} />
        <Route path='/update/:id' element={<NewsUpdatePage {...props} />} />
        <Route path='*' element={<NotFoundPage {...props} />}></Route>
      </Route>
    </Routes>
  );
};

export default NewsRouter;
