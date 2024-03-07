import { ID } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useState } from 'react';
import { ICurrentUserDto } from '../../../../dto/current-user/CurrentUserDto';
import { useMessage } from '../../../../hook/message/useMessage';
import { useAppSelector } from '../../../../store/Store';
import { StorageUtils } from '../../../../utils/storage/StorageUtils';
import { useAuth } from '../../../auth/hook/useAuth';
import { IUserDto } from '../dto/UserDto';
import UserService from '../service/UserService';

export const useUser = () => {
  const { updateLocalStorage } = useAuth();
  const { setMessage } = useMessage();
  const [user, setUser] = useState<IUserDto>({});
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const fetchById = useCallback((id: ID) => {
    id &&
      UserService.fetchById(id).then((data) => {
        setUser(data);
      });
  }, []);

  const updateLocalUser = useCallback(
    (newUser: IUserDto) => {
      let user = StorageUtils.getCurrentUser<ICurrentUserDto<IUserDto>>();
      if (user?.user) {
        user = {
          ...user,
          user: {
            ...user.user,
            ...newUser,
          },
        };
        updateLocalStorage(user);
      }
    },
    [updateLocalStorage],
  );

  const handleUpdateAvatar = useCallback(
    (avatar: string, callback?: () => void) => {
      updateLocalUser({
        avatar: avatar,
      });
      setMessage('AUTH:USER.AVATAR.SUCCESS', 'success');
      callback?.();
    },
    [updateLocalUser, setMessage],
  );

  const handleUpdateEmail = useCallback(
    (id: ID, email: string, callback?: () => void) => {
      UserService.updateEmail(id, email).then((data) => {
        updateLocalUser({ ...data });
        setMessage('AUTH:USER.EMAIL.SUCCESS', 'success');
        callback?.();
      });
    },
    [updateLocalUser, setMessage],
  );

  const handleUpdatePassword = useCallback(
    (id: ID, password: string, newPassword: string, callback?: () => void) => {
      UserService.updatePassword(id, password, newPassword).then((data) => {
        updateLocalUser({ ...data });
        setMessage('AUTH:USER.PASSWORD.SUCCESS', 'success');
        callback?.();
      });
    },
    [updateLocalUser, setMessage],
  );

  const isUserPassword = useCallback(
    (user: IUserDto) => {
      return (
        (!user.googleId || user.googleId === '') &&
        (!user.facebookId || user.facebookId === '') &&
        currentUser?.user?.id === user.id
      );
    },
    [currentUser?.user?.id],
  );

  return { user, fetchById, handleUpdateAvatar, handleUpdateEmail, handleUpdatePassword, isUserPassword };
};
