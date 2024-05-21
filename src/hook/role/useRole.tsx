import { useCallback } from 'react';
import { deepEqual } from '../../reducer/utils/ReducerUtils';
import { useAppSelector } from '../../store/Store';
import { RoleUtils } from '../../utils/role/RoleUtils';

export const useRole = () => {
  const userConnected = useAppSelector((state) => state.auth.user?.user, deepEqual);

  const hasUserRole = useCallback(
    (roles?: string[], notRoles?: string[]) => {
      if (notRoles && notRoles.length > 0) {
        return RoleUtils.hasProfile(userConnected, roles) && !RoleUtils.hasProfile(userConnected, notRoles);
      }
      return RoleUtils.hasProfile(userConnected, roles);
    },
    [userConnected],
  );

  return { userConnected, userId: userConnected?.id, hasUserRole };
};
