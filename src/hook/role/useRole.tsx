import { useCallback } from 'react';
import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../module/user/user/dto/UserDto';
import { useAppSelector } from '../../store/Store';
import RoleUtils from '../../utils/role/RoleUtils';

export const useRole = () => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);

  const hasUserRole = useCallback(
    (roles?: string[]) => {
      return RoleUtils.hasProfile(currentUser, roles);
    },
    [currentUser],
  );

  return { currentUser, user: currentUser?.user, hasUserRole };
};
