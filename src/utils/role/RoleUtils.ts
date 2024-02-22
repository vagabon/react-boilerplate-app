import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../module/user/user/dto/UserDto';

const RoleUtils = {
  hasProfile: (currentUser: ICurrentUserDto<IUserDto> | null, roleToCheck?: string[]): boolean => {
    let hasProfile: boolean = false;
    if (roleToCheck === undefined || roleToCheck.length === 0 || roleToCheck[0] === '') {
      return true;
    }
    if (currentUser?.user) {
      roleToCheck.forEach((role: string) => {
        if (currentUser?.user?.profiles?.find((userProfile) => userProfile.roles?.includes(role))) {
          hasProfile = true;
        }
      });
    }
    return hasProfile;
  },
};

export default RoleUtils;
