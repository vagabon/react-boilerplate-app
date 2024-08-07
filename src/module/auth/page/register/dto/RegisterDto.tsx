import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';

export interface IRegisterDto extends IApiDto {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
  accept?: boolean;
}

export class RegisterDto implements IRegisterDto {
  username = '';
  email = '';
  password = '';
  password2 = '';
}
