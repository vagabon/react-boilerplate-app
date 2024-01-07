import { Route, Routes } from 'react-router-dom';
import NewsShowPage from './page/show/NewsShowPage';
import NewsUpdatePage from './page/update/NewsUpdatePage';

const NewsRouter: React.FC = () => {
  return (
    <Routes>
      <Route>
        <Route path='/show/:id' element={<NewsShowPage />} />
        <Route path='/add' element={<NewsUpdatePage />} />
        <Route path='/update/:id' element={<NewsUpdatePage />} />
      </Route>
    </Routes>
  );
};

export default NewsRouter;
