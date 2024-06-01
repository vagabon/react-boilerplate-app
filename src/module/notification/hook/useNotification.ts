import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useApiService } from '../../../api/hook/useApiService';
import { useModal } from '../../../app/modal/hook/useModal';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { INotificationDto } from '../dto/NotificationDto';
import { NotificationAction } from '../reducer/NotificationReducer';

const URI_NOTIFICATION = '/notification/';
const URI_NOTIFICATION_READALL = '/notification/readAll/';

export const useNotification = (apiUrl: string) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.user?.id, shallowEqual);
  const { httpPut } = useApiService(apiUrl);
  const { open, openModal, closeModal } = useModal();
  const [notification, setNotification] = useState<INotificationDto>({});

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
      httpPut(URI_NOTIFICATION_READALL + userId, {}, () => {
        callback?.();
        dispatch(NotificationAction.setNbNotification(0));
        dispatch(NotificationAction.readAll());
      });
    },
    [httpPut, dispatch, userId],
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
    updateNotification,
    handleReadAll,
    handleClick,
    handleCheckbox,
    open,
    notification,
    closeModal,
  };
};
