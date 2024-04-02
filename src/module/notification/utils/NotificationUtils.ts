import { DateUtils } from '@vagabond-inc/react-boilerplate-md';
import { ICustomListDto } from '../../custom/list/component/CustomList';
import { INotificationDto } from '../dto/NotificationDto';

export const NotificationUtils = {
  convertToCustomList: (notifications: INotificationDto[]): ICustomListDto[] => {
    return (
      notifications.map(
        (notification) =>
          ({
            icon: NotificationUtils.getIcon(notification.category as string),
            user: notification?.user,
            name: notification.title,
            secondary: DateUtils.format(notification?.creationDate as string, 'Le DD MMM YYYY à hhhmm'),
            checked: notification.read,
            entity: notification,
          }) as ICustomListDto,
      ) ?? []
    );
  },
  getIcon: (category: string) => {
    switch (category) {
      case 'REWARD':
        return 'gift';
      case 'REWARD_MEMBER':
        return 'click';
      case 'CREATOR':
        return 'camera';
      case 'LINK':
      case 'LINK_ACTIVE':
        return 'link';
      case 'MEMBER':
        return 'account';
      case 'IMPORT':
        return 'dashboard';
      default:
        return 'info';
    }
  },
};
