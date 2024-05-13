import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback } from 'react';
import { useApiServiceFetchBy } from '../../../api/hook/useApiServiceFetchBy';
import { INotificationDto } from '../dto/NotificationDto';
import { NotificationAction } from '../reducer/NotificationReducer';

const URI_NOTIFICATION_FINDYBY = '/notification/findBy';

export const useNotificationFetch = (apiUrl: string) => {
  const { datas, search, count, page, doFetchByFields, doSearch, doChangePage } = useApiServiceFetchBy(
    apiUrl,
    'notification',
    URI_NOTIFICATION_FINDYBY,
    '(title%And|message%)AndUser.idAndActive',
    NotificationAction,
    50,
  );

  const doFetchNotifications = useCallback(
    (filter: INotificationDto, page: number, userId: ID) => {
      const value = filter.title ?? '';
      const values = value + ',' + value + ',' + (userId ?? '0') + ',true';
      userId && doFetchByFields(values, page);
    },
    [doFetchByFields],
  );

  const doSearchNotifications = useCallback(
    (userId: ID) =>
      (title?: string): void => {
        doSearch(title as string, (field: string) => {
          doFetchNotifications({ title: field }, 0, userId);
        });
      },
    [doSearch, doFetchNotifications],
  );

  const doChangePageNotifications = useCallback(
    (page: number, userId: ID) =>
      (pageToAdd: number): void => {
        doChangePage(page, (search: string, page: number) => {
          doFetchNotifications({ title: search }, page, userId);
        })(pageToAdd);
      },
    [doChangePage, doFetchNotifications],
  );

  return {
    notifications: datas,
    search,
    count,
    page,
    doFetchNotifications,
    doSearchNotifications,
    doChangePageNotifications,
  };
};
