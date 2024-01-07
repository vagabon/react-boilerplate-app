import { ITableDto } from '@vagabond-inc/react-boilerplate-md';
import { IYupValidator } from '../../../utils/yup/YupUtils';

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
}

export interface IAdminTabDto {
  name: string;
  label: string;
  findByChamps: string;
  sortBy: string;
  cells: ITableDto[];
  form: { [x: string]: IFormDto };
}

export interface IAdminTabConfDto {
  max: number;
  tabs: IAdminTabDto[];
}
