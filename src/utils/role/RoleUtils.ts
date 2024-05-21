import { IUserDto } from '../../module/user/user/dto/UserDto';

export const RoleUtils = {
  hasProfile: (currentUser?: IUserDto, roleToCheck?: string[]): boolean => {
    let hasProfile: boolean = false;
    if (roleToCheck === undefined || roleToCheck.length === 0 || roleToCheck[0] === '') {
      return true;
    }
    if (currentUser) {
      roleToCheck.forEach((role: string) => {
        if (currentUser?.profiles?.find((userProfile) => userProfile.roles?.includes(role))) {
          hasProfile = true;
        }
      });
    }
    return hasProfile;
  },
};
