import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';

export interface IAdminFilterDto {
  search: string;
}

export interface IAdminTableDto {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortByOrder: 'asc' | 'desc';
}

export interface IAdminStateDto {
  count: number;
  datas: IApiDto[];
  data: IApiDto;
  filter: IAdminFilterDto;
  table: IAdminTableDto;
}

export interface IAdminReducerDto {
  [x: string]: IAdminStateDto;
}
