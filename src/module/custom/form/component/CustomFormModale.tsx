import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdList } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdList';
import { MdListItem } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItem';
import { MdListItemButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemButton';
import { MdListItemText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemText';
import { MdCommonModal } from '@vagabond-inc/react-boilerplate-md/dist/md/component/modal/MdCommonModal';
import { MdSearchBar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/searchbar/MdSearchBar';
import { useAppTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useAppTranslate';
import { memo, useCallback, useEffect, useState } from 'react';
import { IManyToManyDto } from '../../../admin/dto/AdminConfDto';
import { AdminService } from '../../../admin/service/AdminService';

interface ICustomFormModaleProps {
  apiUrl: string;
  conf?: IManyToManyDto;
  open: boolean;
  handleClose: () => void;
  handleSelect: (data: IApiDto) => () => void;
}

export const CustomFormModale: React.FC<ICustomFormModaleProps> = memo(({ apiUrl, conf, open, ...rest }) => {
  const { t } = useAppTranslate();
  const [search, setSearch] = useState<string>('');
  const [datas, setDatas] = useState<IApiDto[]>([]);

  const loadDatas = useCallback(
    (search: string): void => {
      conf &&
        AdminService.findBy(apiUrl, conf.endPoint, conf.fields, search, 0, 500, {
          order: conf.order,
          orderAsc: conf.orderBy === 'asc',
        }).then((datas) => {
          setDatas(datas.content);
        });
    },
    [apiUrl, conf],
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
    <MdCommonModal className='flex' open={open} handleClose={rest.handleClose}>
      <MdCard icon='add' title='Ajouter'>
        <MdSearchBar callBack={handleSearch} search={search} />
        <MdList className='modal-list overflow overflow-x-none'>
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
      </MdCard>
    </MdCommonModal>
  );
});
