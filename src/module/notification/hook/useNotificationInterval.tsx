import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useApiService } from '../../../api/hook/useApiService';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { NotificationAction } from '../reducer/NotificationReducer';

const URI_NOTIFICATION_COUNT = '/notification/count/';

export const useNotificationInterval = (apiUrl: string) => {
  const dispatch = useAppDispatch();
  const nbNotification = useAppSelector((state) => state.notification.nbNotification, shallowEqual);
  const userId = useAppSelector((state) => state.auth.user?.user?.id, shallowEqual);
  const { httpGet } = useApiService(apiUrl);

  const fetchNotificationUnread = useCallback(() => {
    userId &&
      httpGet(URI_NOTIFICATION_COUNT + userId, (data) => {
        dispatch(NotificationAction.setNbNotification(data as number));
      });
  }, [httpGet, dispatch, userId]);

  return { nbNotification, fetchNotificationUnread };
};
