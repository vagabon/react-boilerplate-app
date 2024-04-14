import {
  IApiDto,
  IFormPropsDto,
  IListDto,
  JSONObject,
  MdFormSelect,
  ObjectUtils,
} from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect, useState } from 'react';
import { ApiService } from '../../../../api/service/ApiService';
import { IPageableDto } from '../../../../dto/pageable/PageableDto';
import { IFormDto } from '../../../admin/dto/AdminConfDto';

export interface ICustomFormSelectProps extends IFormPropsDto {
  apiUrl: string;
  conf: IFormDto;
  label: string;
  name: string;
  listId: boolean;
}

const CustomFormSelect: React.FC<ICustomFormSelectProps> = memo(({ apiUrl, conf, label, name, listId, ...rest }) => {
  const [datas, setDatas] = useState<IListDto[]>([]);

  useEffect(() => {
    conf.listEndPoint &&
      ApiService.get<IPageableDto<IApiDto[]>>(apiUrl, conf.listEndPoint).then((data) => {
        setDatas(
          data?.content?.map((dat) => {
            return {
              id: dat.id,
              libelle: ObjectUtils.getRecursivValue(dat as JSONObject, conf.listName as string),
            } as IListDto;
          }),
        );
      });
  }, [apiUrl, conf]);

  return <MdFormSelect label={label} name={name} list={datas} byId={listId} {...rest} />;
});

export default CustomFormSelect;
