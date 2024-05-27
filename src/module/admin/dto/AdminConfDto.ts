import { ITableDto } from '@vagabond-inc/react-boilerplate-md/dist/md/component/table/MdTable';
import { IYupValidator } from '../../../app/form/utils/AppFormUtils';

export interface IManyToManyDto {
  name: string;
  endPoint: string;
  fields: string;
  order: string;
  orderBy: string;
}

export interface IFormDto extends IYupValidator {
  label: string;
  className?: string;
  listEndPoint?: string;
  listName?: string;
  m2m?: IManyToManyDto;
  value?: string;
}

export interface IAdminTabDto {
  name: string;
  label: string;
  findByChamps: string;
  sortBy: string;
  sortByAsc?: 'asc' | 'desc';
  cells: ITableDto[];
  form: { [x: string]: IFormDto };
}

export interface IAdminTabConfDto {
  max: number;
  tabs: IAdminTabDto[];
}
