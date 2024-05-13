import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IUserDto } from './UserDto';

export interface IFileDto extends IApiDto {
  name?: string;
  directory?: string;
  path?: string;
  user?: IUserDto;
}
