import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IUserDto } from '../../user/user/dto/UserDto';

export interface INotificationDto extends IApiDto {
  title?: string;
  message?: string;
  category?: string;
  superType?: string;
  type?: string;
  entityId?: number;
  read?: boolean;
  user?: IUserDto;
  url?: string;
}
