import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IReducersActionsProps } from '../../store/reducer/BaseReducer';
import { IHeaderDto } from '../../template/dto/HeaderDto';
import { ICustomChatbotButtonProps } from '../custom/chatbot/component/CustomChatbotButton';
import { NotFoundPage } from '../not-found/page/NotFoundPage';
import { NewsListPage } from './page/list/NewsListPage';
import { NewsShowPage } from './page/show/NewsShowPage';
import { NewsUpdatePage } from './page/update/NewsUpdatePage';

export interface INewsRouterProps extends IHeaderDto, ICustomChatbotButtonProps {
  endPoint: string;
  newsAction: IReducersActionsProps;
}

export const NewsRouter: React.FC<INewsRouterProps> = memo(({ ...rest }) => {
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
