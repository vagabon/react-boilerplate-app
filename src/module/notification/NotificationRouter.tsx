import { ReactNode, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IHeaderProp } from '../../template/Header';
import { INotificationDto } from './dto/NotificationDto';
import NotificationPage from './page/NotificationPage';

export interface INotificationRouterProps extends IHeaderProp {
  apiUrl: string;
  header?: ReactNode;
  callbackNavigateNotification: (data: INotificationDto) => void;
  getNotificationIcon: (category: string) => void;
}

const NotificationRouter: React.FC<INotificationRouterProps> = memo(
  ({ apiUrl, header, callbackNavigateNotification, getNotificationIcon, ...rest }) => {
    return (
      <Routes>
        <Route
          path='/'
          element={
            <NotificationPage
              {...rest}
              apiUrl={apiUrl}
              header={header}
              handleSelect={callbackNavigateNotification}
              getNotificationIcon={getNotificationIcon}
            />
          }
        />
      </Routes>
    );
  },
);

export default NotificationRouter;
