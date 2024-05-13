import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IProfileDto } from '../../profile/dto/ProfileDto';

export interface IUserDto extends IApiDto {
  username?: string;
  email?: string;
  avatar?: string;
  password?: string;
  profiles?: IProfileDto[];
  googleId?: string;
  facebookId?: string;

  // Transcient
  search?: string;
  googleToken?: string;
  accessToken?: string;
  newPassword?: string;
}
