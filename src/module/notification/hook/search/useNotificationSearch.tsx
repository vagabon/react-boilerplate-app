import { IApiDto, ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { DateUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/date/DateUtils';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
import { useCallback, useEffect, useState } from 'react';
import { IPageableDto } from '../../../../api/dto/pageable/PageableDto';
import { ApiService } from '../../../../api/service/ApiService';
import { ICustomListDto } from '../../../custom/list/component/CustomList';
import { IUserDto } from '../../../user/user/dto/UserDto';

interface INotificationDto extends IApiDto {
  user: IUserDto;
  title: string;
  message: string;
  url: string;
  entityId: ID;
  users: string;
  type: string;
  type2: string;

  search?: string;
}

export const useNotificationSearch = (apiUrl: string, entityId: ID, type: string) => {
  const [notifications, setNotifications] = useState<INotificationDto[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [custumList, setCustumList] = useState<ICustomListDto[]>([]);
  const [stopLoad, setStopLoad] = useState(false);

  useEffect(() => {
    if (notifications) {
      const newNotifications = notifications.map((notification) => {
        return {
          avatar: notification?.user?.avatar ?? ObjectUtils.capitalize(notification?.user?.username ?? '?'),
          user: notification?.user,
          name: notification.message,
          secondary: DateUtils.format(notification?.creationDate as string, 'Le DD MMM YYYY à hhhmm'),
          entity: notification,
        } as ICustomListDto;
      });

      setCustumList(newNotifications);
    }
  }, [notifications]);

  const fetchNotifications = useCallback(
    (oldNotification: INotificationDto[], filter: INotificationDto, page: number) => {
      const champs = '(message%And|user.username%)AndEntityIdAndCategory';
      const value = filter.search ?? '';
      const values = value + ',' + value + ',' + entityId + ',' + type;
      ApiService.findBy<IPageableDto<INotificationDto[]>>(apiUrl, '/notification/findBy', champs, values, page, 50, {
        order: 'id',
        orderAsc: false,
      }).then((data) => {
        if (data?.content?.length === 0 && page > 0) {
          setStopLoad(true);
        } else {
          setNotifications([...oldNotification, ...(data?.content ?? [])]);
          setStopLoad(false);
        }
      });
    },
    [apiUrl, entityId, type],
  );

  const doSearch = useCallback(
    (oldNotification: INotificationDto[]) =>
      (search: string): void => {
        setSearch(search);
        setPage(0);
        fetchNotifications(oldNotification, { search } as INotificationDto, 0);
      },
    [fetchNotifications],
  );

  const doChangePage = useCallback(
    (oldNotification: INotificationDto[], page: number) =>
      (pageToAdd: number): void => {
        if (!stopLoad) {
          const newPage = page + pageToAdd;
          setPage(newPage);
          fetchNotifications(oldNotification, { search } as INotificationDto, newPage);
        }
      },
    [fetchNotifications, stopLoad, search],
  );

  return { notifications, custumList, search, page, fetchNews: fetchNotifications, doSearch, doChangePage };
};
