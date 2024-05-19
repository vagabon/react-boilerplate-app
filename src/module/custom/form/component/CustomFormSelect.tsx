import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IFormPropsDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/form/FormDto';
import { IListDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/list/ListDto';
import { MdFormSelect } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/select/MdFormSelect';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
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

export const CustomFormSelect: React.FC<ICustomFormSelectProps> = memo(
  ({ apiUrl, conf, label, name, listId, ...rest }) => {
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
  },
);
