import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IBaseCustomSeoProps } from '../custom/seo/component/CustomSeo';
import { INotificationDto } from './dto/NotificationDto';
import NotificationPage from './page/NotificationPage';

export interface INotificationRouterProps extends IBaseCustomSeoProps {
  apiUrl: string;
  header?: ReactNode;
  callbackNavigateNotification: (data: INotificationDto) => void;
}

const NotificationRouter: React.FC<INotificationRouterProps> = ({
  apiUrl,
  header,
  callbackNavigateNotification,
  ...rest
}) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <NotificationPage {...rest} apiUrl={apiUrl} header={header} handleSelect={callbackNavigateNotification} />
        }
      />
    </Routes>
  );
};
export default NotificationRouter;
