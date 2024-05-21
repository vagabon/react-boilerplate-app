import { useEffect, useRef } from 'react';
import { useNotification } from './useNotification';

export const useNotificationInterval = (apiUrl: string) => {
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
