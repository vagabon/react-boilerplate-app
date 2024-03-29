import { useEffect, useRef } from 'react';
import { useNotification } from '../../module/notification/hook/useNotification';

export const useAppNotification = (apiUrl: string) => {
  const { nbNotification, fetchNotificationUnread } = useNotification(apiUrl);
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetchNotificationUnread();
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      fetchNotificationUnread();
    }, 60000);
  }, [fetchNotificationUnread]);

  return { nbNotification };
};
