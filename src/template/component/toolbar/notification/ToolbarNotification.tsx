import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdBadge } from '@vagabond-inc/react-boilerplate-md/dist/md/component/badge/MdBadge';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNotificationInterval } from '../../../../module/notification/hook/useNotificationInterval';
import { useAppSelector } from '../../../../store/Store';

export interface IToolbarNotificationProps {
  apiUrl: string;
}

export const ToolbarNotification: React.FC<IToolbarNotificationProps> = ({ apiUrl }) => {
  const { getIcon } = useIcon();
  const { handleNavigate } = useAppRouter();
  const { nbNotification, fetchNotificationUnread } = useNotificationInterval(apiUrl);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn, shallowEqual);

  useEffect(() => {
    fetchNotificationUnread();
  }, [fetchNotificationUnread]);

  return (
    <>
      {isLoggedIn && (
        <IconClickable
          aria-label={'show ' + nbNotification + ' new notifications'}
          callback={handleNavigate('/notification')}>
          <MdBadge badgeContent={nbNotification}>{getIcon('notification', 'inherit')}</MdBadge>
        </IconClickable>
      )}
    </>
  );
};
