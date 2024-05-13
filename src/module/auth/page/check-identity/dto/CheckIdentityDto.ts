import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';

export interface ICheckIdentityDto extends IApiDto {
  token?: string;
}
