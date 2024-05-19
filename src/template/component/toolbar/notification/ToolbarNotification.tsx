import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdBadge } from '@vagabond-inc/react-boilerplate-md/dist/md/component/badge/MdBadge';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useAppNotification } from '../../../hook/useAppNotification';

export interface IToolbarNotificationProps {
  apiUrl: string;
}

export const ToolbarNotification: React.FC<IToolbarNotificationProps> = ({ apiUrl }) => {
  const { getIcon } = useIcon();
  const { handleNavigate } = useAppRouter();
  const { nbNotification } = useAppNotification(apiUrl);

  return (
    <IconClickable
      color='inherit'
      aria-label={'show ' + nbNotification + ' new notifications'}
      callback={handleNavigate('/notification')}>
      <MdBadge badgeContent={nbNotification}>{getIcon('notification', 'inherit')}</MdBadge>
    </IconClickable>
  );
};
