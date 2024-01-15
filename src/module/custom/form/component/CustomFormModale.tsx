import {
  IApiDto,
  MdCommonModal,
  MdList,
  MdListItem,
  MdListItemButton,
  MdListItemText,
  MdSearchBar,
  useAppTranslate,
} from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import { IManyToManyDto } from '../../../admin/dto/AdminConfDto';
import AdminService from '../../../admin/service/AdminService';

interface ICustomFormModaleProps {
  conf?: IManyToManyDto;
  open: boolean;
  handleClose: () => void;
  handleSelect: (data: IApiDto) => () => void;
}

const CustomFormModale: React.FC<ICustomFormModaleProps> = ({ conf, open, ...rest }) => {
  const { t } = useAppTranslate();
  const [search, setSearch] = useState<string>('');
  const [datas, setDatas] = useState<IApiDto[]>([]);

  const loadDatas = useCallback(
    (search: string): void => {
      conf &&
        AdminService.findBy(conf.endPoint, conf.fields, search, 0, 500, conf.order, conf.orderBy).then((datas) => {
          setDatas(datas.content);
        });
    },
    [conf],
  );

  const handleSearch = useCallback((search: string): void => {
    setSearch(search);
  }, []);

  useEffect(() => {
    if (open === true) {
      loadDatas(search);
    }
  }, [open, search, loadDatas]);

  return (
    <MdCommonModal open={open} handleClose={rest.handleClose}>
      <MdSearchBar callBack={handleSearch} search={search} />
      <MdList className='modal-list'>
        {(!datas || datas.length === 0) && (
          <MdListItem component='div' disablePadding>
            <MdListItem>
              <MdListItemText color='flex justify-center' label={t('NO_RESULT')} />
            </MdListItem>
          </MdListItem>
        )}
        {datas?.map((data) => (
          <MdListItem key={data.id} component='div' disablePadding>
            <MdListItemButton callback={rest.handleSelect(data)}>
              <MdListItemText label={(data['name' as keyof IApiDto] as string) ?? ''} />
            </MdListItemButton>
          </MdListItem>
        ))}
      </MdList>
    </MdCommonModal>
  );
};

export default CustomFormModale;
