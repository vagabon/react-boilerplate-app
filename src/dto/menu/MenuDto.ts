export interface IMenuDto {
  title: string;
  link: string;
  base?: string;
  roles?: string[];
  notRoles?: string[];
  icon?: string;
  notConnected?: boolean;
  childrens?: IMenuDto[];
}
