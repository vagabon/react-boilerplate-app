import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { IUserDto } from '../../user/user/dto/UserDto';

export interface INewsDto extends IApiDto {
  title?: string;
  avatar?: string;
  image?: string;
  resume?: string;
  description?: string;
  user?: IUserDto;
  search?: string;
  tags?: string;
}
