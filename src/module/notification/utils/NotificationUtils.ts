import { DateUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/date/DateUtils';
import { ICustomListDto } from '../../custom/list/component/CustomList';
import { INotificationDto } from '../dto/NotificationDto';

export const NotificationUtils = {
  convertToCustomList: (
    notifications: INotificationDto[],
    getNotificationIcon: (category: string) => void,
  ): ICustomListDto[] => {
    return (
      notifications?.map(
        (notification) =>
          ({
            icon: getNotificationIcon(notification.category as string),
            user: notification?.user,
            name: notification.title,
            secondary: DateUtils.format(notification?.creationDate as string, 'Le DD MMM YYYY à hhhmm'),
            checked: notification.read,
            entity: notification,
          }) as ICustomListDto,
      ) ?? []
    );
  },
};
