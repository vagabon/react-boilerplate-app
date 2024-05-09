import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { IUserDto } from './UserDto';

export interface IFileDto extends IApiDto {
  name?: string;
  directory?: string;
  path?: string;
  user?: IUserDto;
}
