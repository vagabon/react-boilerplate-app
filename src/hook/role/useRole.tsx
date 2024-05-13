import { useCallback } from 'react';
import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../module/user/user/dto/UserDto';
import { useAppSelector } from '../../store/Store';
import { RoleUtils } from '../../utils/role/RoleUtils';

export const useRole = () => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);

  const hasUserRole = useCallback(
    (roles?: string[], notRoles?: string[]) => {
      if (notRoles && notRoles.length > 0) {
        return RoleUtils.hasProfile(currentUser, roles) && !RoleUtils.hasProfile(currentUser, notRoles);
      }
      return RoleUtils.hasProfile(currentUser, roles);
    },
    [currentUser],
  );

  return { currentUser, userConnected: currentUser?.user, hasUserRole };
};
