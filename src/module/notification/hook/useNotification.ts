import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback, useState } from 'react';
import { useApiService } from '../../../api/hook/useApiService';
import { useModal } from '../../../hook/modal/useModal';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { useAuth } from '../../auth/hook/useAuth';
import { INotificationDto } from '../dto/NotificationDto';
import { NotificationAction } from '../reducer/NotificationReducer';

const URI_NOTIFICATION = '/notification/';
const URI_NOTIFICATION_COUNT = '/notification/count/';
const URI_NOTIFICATION_READALL = '/notification/readAll/';

export const useNotification = (apiUrl: string) => {
  const dispatch = useAppDispatch();
  const { nbNotification } = useAppSelector((state) => state.notification);
  const { user } = useAuth(apiUrl);
  const { httpGet } = useApiService(apiUrl);
  const { httpPut } = useApiService(apiUrl);
  const { open, openModal, closeModal } = useModal();
  const [notification, setNotification] = useState<INotificationDto>({});

  const fetchNotificationUnread = useCallback(() => {
    user?.id &&
      httpGet(URI_NOTIFICATION_COUNT + user?.id, (data) => {
        dispatch(NotificationAction.setNbNotification(data as number));
      });
  }, [httpGet, dispatch, user?.id]);

  const updateNotification = useCallback(
    (notification: INotificationDto, callback: () => void) => {
      httpPut(URI_NOTIFICATION, notification, () => {
        callback();
        dispatch(NotificationAction.addNbNotification(notification.read ? -1 : 1));
      });
    },
    [httpPut, dispatch],
  );

  const handleReadAll = useCallback(
    (callback?: () => void) => () => {
      httpPut(URI_NOTIFICATION_READALL + user?.id, {}, () => {
        callback?.();
        dispatch(NotificationAction.setNbNotification(0));
        dispatch(NotificationAction.readAll());
      });
    },
    [httpPut, dispatch, user?.id],
  );

  const handleCheckboxUpdate = useCallback(
    (notifications: INotificationDto[], id: ID, checked?: boolean) => {
      const notification = notifications.find((notification) => notification.id === id);
      if (notification) {
        const newNotification = {
          ...notification,
          read: checked === undefined ? !notification.read : checked === true,
        };
        updateNotification(newNotification, () => {
          dispatch(NotificationAction.replaceItem(newNotification));
        });
      }
    },
    [updateNotification, dispatch],
  );

  const handleCheckbox = useCallback(
    (notifications: INotificationDto[]) => (id: ID, checked: boolean) => {
      handleCheckboxUpdate(notifications, id, checked);
    },
    [handleCheckboxUpdate],
  );

  const handleClick = useCallback(
    (notifications: INotificationDto[]) => (data: INotificationDto) => {
      openModal();
      setNotification(data);
      if (!data.read) {
        handleCheckboxUpdate(notifications, data.id, true);
      }
    },
    [openModal, handleCheckboxUpdate],
  );

  return {
    nbNotification,
    fetchNotificationUnread,
    updateNotification,
    handleReadAll,
    handleClick,
    handleCheckbox,
    open,
    notification,
    closeModal,
  };
};
