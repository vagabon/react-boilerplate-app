import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { ICurrentUserDto } from '../../../../api/dto/current-user/CurrentUserDto';
import { useApiService } from '../../../../api/hook/useApiService';
import { useAppMessage } from '../../../../app/message/hook/useAppMessage';
import { AppStorageUtils } from '../../../../app/storage/utils/AppStorageUtils';
import { useAppSelector } from '../../../../store/Store';
import { useAuth } from '../../../auth/hook/useAuth';
import { IUserDto } from '../dto/UserDto';
import { UserService } from '../service/UserService';

export const useUser = (apiUrl: string) => {
  const { updateLocalStorage } = useAuth(apiUrl);
  const { setMessage } = useAppMessage();
  const [user, setUser] = useState<IUserDto>({});
  const userId = useAppSelector((state) => state.auth.user?.user?.id, shallowEqual);
  const { httpPost } = useApiService<IUserDto>(apiUrl);

  const fetchById = useCallback(
    (id: ID) => {
      id &&
        UserService.fetchById(apiUrl, id).then((data) => {
          setUser(data);
        });
    },
    [apiUrl],
  );

  const updateLocalUser = useCallback(
    (newUser: IUserDto) => {
      let user = AppStorageUtils.getCurrentUser<ICurrentUserDto<IUserDto>>();
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
      httpPost('/user/avatar', { avatar: avatar }, () => {
        updateLocalUser({
          avatar: avatar,
        });
        setMessage('AUTH:USER.AVATAR.SUCCESS', 'success');
        callback?.();
      });
    },
    [httpPost, updateLocalUser, setMessage],
  );

  const handleUpdateEmail = useCallback(
    (id: ID, email: string, callback?: () => void) => {
      UserService.updateEmail(apiUrl, id, email).then((data) => {
        updateLocalUser({ ...data });
        setMessage('AUTH:USER.EMAIL.SUCCESS', 'success');
        callback?.();
      });
    },
    [apiUrl, updateLocalUser, setMessage],
  );

  const handleUpdatePassword = useCallback(
    (id: ID, password: string, newPassword: string, callback?: () => void) => {
      UserService.updatePassword(apiUrl, id, password, newPassword).then((data) => {
        updateLocalUser({ ...data });
        setMessage('AUTH:USER.PASSWORD.SUCCESS', 'success');
        callback?.();
      });
    },
    [apiUrl, updateLocalUser, setMessage],
  );

  const isUserPassword = useCallback(
    (user: IUserDto) => {
      return (
        (!user.googleId || user.googleId === '') && (!user.facebookId || user.facebookId === '') && userId === user.id
      );
    },
    [userId],
  );

  return { user, fetchById, handleUpdateAvatar, handleUpdateEmail, handleUpdatePassword, isUserPassword };
};
