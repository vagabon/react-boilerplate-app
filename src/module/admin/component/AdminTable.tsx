import { JSONObject, MdCard, MdSearchBar, MdTableWithPagination } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect, useState } from 'react';
import AppButtonRefresh from '../../../app/button/component/refresh/AppButtonRefresh';
import AppFabAdd from '../../../app/fab/add/AppFabAdd';
import HasRole from '../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../custom/seo/component/CustomSeo';
import { IFileDto } from '../../user/user/dto/FileDto';
import { IAdminTabConfDto, IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { useAdminList } from '../hook/useAdminList';
import { useAdminState } from '../hook/useAdminState';

export interface IAdminListPageProps extends IBaseCustomSeoProps {
  activePage: string;
  conf: IAdminTabConfDto;
}
const AdminTable: React.FC<IAdminListPageProps> = memo(({ activePage, conf, ...rest }) => {
  const [pageConf, setPageConf] = useState<IAdminTabDto>();
  const { state } = useAdminState(activePage, pageConf as IAdminTabDto);
  const [cells, setCells] = useState(pageConf?.cells);

  useEffect(() => {
    if (pageConf?.cells) {
      let cells = [...pageConf.cells];
      if (activePage === 'file') {
        cells = cells.map((cell) => {
          if (cell.name === 'img') {
            cell = {
              ...cell,
              react: (data: IFileDto) => (
                <img src={rest.apiUrl + '/file/download?filename=' + data.path} width='50px' />
              ),
            };
          }
          return cell;
        });
      }
      setCells(cells);
    }
  }, [activePage, pageConf?.cells, rest.apiUrl]);

  const { search, handleSearch, handleTableChange } = useAdminList(
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
          <div className='flex flex-row align-end'>
            <MdSearchBar className='flex1' callBack={handleSearch} search={state?.filter?.search} />
            <AppButtonRefresh data={search} callback={handleSearch} />
          </div>
          {pageConf && cells && state?.table && (
            <MdTableWithPagination
              count={state?.count}
              datas={state?.datas as JSONObject[]}
              page={state?.table.page}
              cells={cells}
              rowsPerPage={state?.table.rowsPerPage}
              sortBy={state?.table.sortBy}
              sortByOrder={state?.table.sortByOrder}
              url={'/admin/update/' + activePage + '/'}
              callBack={handleTableChange}
              showEmpty
            />
          )}
        </HasRole>
      </MdCard>
      <AppFabAdd urlAdd={'/admin/update/' + activePage + '/-1'} urlAddRole={['ADMIN']} />
    </>
  );
});

export default AdminTable;
