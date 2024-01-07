import { IApiDto } from '@vagabond-inc/react-boilerplate-md';

export interface IProfileDto extends IApiDto {
  name?: string;
  roles?: string;
  search?: string;
}
