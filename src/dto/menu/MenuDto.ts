export interface IMenuDto {
  title: string;
  link: string;
  roles?: string[];
  icon?: string;
  notConnected?: boolean;
  childrens?: IMenuDto[];
}
