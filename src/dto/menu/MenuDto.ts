export interface IMenuDto {
  title: string;
  link: string;
  roles?: string[];
  icon?: string;
  isLogin?: boolean;
  childrens?: IMenuDto[];
}
