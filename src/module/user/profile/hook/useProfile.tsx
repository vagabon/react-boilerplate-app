import { useCallback } from 'react';
import { useAppSelector } from '../../../../store/Store';
import { deepEqual } from '../../../../store/utils/StoreUtils';
import { ProfileUtils } from '../utils/ProfileUtils';

export const useProfile = () => {
  const userConnected = useAppSelector((state) => state.auth.user?.user, deepEqual);

  const hasUserRole = useCallback(
    (roles?: string[], notRoles?: string[]) => {
      if (notRoles && notRoles.length > 0) {
        return ProfileUtils.hasProfile(userConnected, roles) && !ProfileUtils.hasProfile(userConnected, notRoles);
      }
      return ProfileUtils.hasProfile(userConnected, roles);
    },
    [userConnected],
  );

  return { userConnected, userId: userConnected?.id, hasUserRole };
};
