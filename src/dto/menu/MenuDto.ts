export interface IMenuDto {
  title: string;
  link: string;
  roles?: string[];
  notRoles?: string[];
  icon?: string;
  notConnected?: boolean;
  childrens?: IMenuDto[];
}
