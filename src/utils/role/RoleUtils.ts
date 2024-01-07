import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../module/user/user/dto/UserDto';

const RoleUtils = {
  hasProfile: (currentUser: ICurrentUserDto<IUserDto> | null, profiles?: string[]): boolean => {
    let hasProfile: boolean = false;
    if (profiles === undefined || profiles.length === 0 || profiles[0] === '') {
      return true;
    }
    if (currentUser?.user) {
      profiles.forEach((role: string) => {
        if (currentUser?.user?.profiles?.find((userProfile) => userProfile.name === role)) {
          hasProfile = true;
        }
      });
    }
    return hasProfile;
  },
};

export default RoleUtils;
