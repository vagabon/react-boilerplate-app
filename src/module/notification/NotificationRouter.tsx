import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { INotificationDto } from './dto/NotificationDto';
import NotificationPage from './page/NotificationPage';

export interface INotificationRouterProps {
  header: ReactNode;
  callbackNavigateNotification: (data: INotificationDto) => void;
}

const NotificationRouter: React.FC<INotificationRouterProps> = ({ header, callbackNavigateNotification }) => {
  return (
    <Routes>
      <Route path='/' element={<NotificationPage header={header} handleSelect={callbackNavigateNotification} />} />
    </Routes>
  );
};
export default NotificationRouter;
