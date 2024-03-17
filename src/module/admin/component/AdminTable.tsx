import { JSONObject, MdCard, MdSearchBar, MdTableWithPagination } from '@vagabond-inc/react-boilerplate-md';
import { useEffect, useState } from 'react';
import AppFabAdd from '../../../app/fab/add/AppFabAdd';
import HasRole from '../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../custom/seo/component/CustomSeo';
import { IAdminTabConfDto, IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { useAdminList } from '../hook/useAdminList';
import { useAdminState } from '../hook/useAdminState';

export interface IAdminListPageProps extends IBaseCustomSeoProps {
  activePage: string;
  conf: IAdminTabConfDto;
}
const AdminTable: React.FC<IAdminListPageProps> = ({ activePage, conf, ...rest }) => {
  const [pageConf, setPageConf] = useState<IAdminTabDto>();
  const { state } = useAdminState(activePage, pageConf as IAdminTabDto);

  const { handleSearch, handleTableChange } = useAdminList(
    rest.apiUrl,
    activePage,
    pageConf as IAdminTabDto,
    state as IAdminStateDto,
  );

  useEffect(() => {
    const pageConf = conf.tabs.find((tab) => tab.name === activePage);
    pageConf && setPageConf(pageConf);
  }, [activePage, conf.tabs]);

  return (
    <>
      <MdCard className='flex flex1'>
        <HasRole roles={['ADMIN']}>
          <MdSearchBar callBack={handleSearch} search={state?.filter?.search} />
          {pageConf && state?.table && (
            <MdTableWithPagination
              count={state?.count}
              datas={state?.datas as JSONObject[]}
              page={state?.table.page}
              cells={pageConf.cells}
              rowsPerPage={state?.table.rowsPerPage}
              sortBy={state?.table.sortBy}
              sortByOrder={state?.table.sortByOrder}
              url={'/admin/update/' + activePage + '/'}
              callBack={handleTableChange}
            />
          )}
        </HasRole>
      </MdCard>
      <AppFabAdd urlAdd={'/admin/update/' + activePage + '/-1'} urlAddRole={['ADMIN']} />
    </>
  );
};

export default AdminTable;
