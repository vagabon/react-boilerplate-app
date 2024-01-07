export interface IMenuDto {
  title: string;
  link: string;
  roles?: string[];
  childrens?: IMenuDto[];
}
