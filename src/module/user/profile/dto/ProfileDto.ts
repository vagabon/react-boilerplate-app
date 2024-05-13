import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';

export interface IProfileDto extends IApiDto {
  name?: string;
  roles?: string;
  search?: string;
}
