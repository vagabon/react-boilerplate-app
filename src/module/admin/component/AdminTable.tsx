import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdSearchBar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/searchbar/MdSearchBar';
import { MdTableWithPagination } from '@vagabond-inc/react-boilerplate-md/dist/md/component/table/MdTableWithPagination';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { memo, useCallback, useEffect, useState } from 'react';
import { AppButtonRefresh } from '../../../app/button/component/refresh/AppButtonRefresh';
import { IBaseCustomSeoProps } from '../../custom/seo/component/CustomSeo';
import { ProfileRole } from '../../user/profile/component/role/ProfileRole';
import { IFileDto } from '../../user/user/dto/FileDto';
import { IAdminTabConfDto, IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { useAdminList } from '../hook/useAdminList';
import { useAdminState } from '../hook/useAdminState';

export interface IAdminListPageProps extends IBaseCustomSeoProps {
  activePage: string;
  conf: IAdminTabConfDto;
}

export const AdminTable: React.FC<IAdminListPageProps> = memo(({ activePage, conf, ...rest }) => {
  const { handleNavigate } = useAppRouter();
  const [pageConf, setPageConf] = useState<IAdminTabDto>();
  const { state } = useAdminState(activePage, pageConf as IAdminTabDto);
  const [cells, setCells] = useState(pageConf?.cells);

  const showImage = useCallback(
    (data: IFileDto) => <img src={rest.apiUrl + '/file/download?filename=' + data.path} alt='download' width='50px' />,
    [rest.apiUrl],
  );

  useEffect(() => {
    if (pageConf?.cells) {
      let cells = [...pageConf.cells];
      if (activePage === 'file') {
        cells = cells.map((cell) => {
          if (cell.name === 'img') {
            cell = {
              ...cell,
              react: showImage,
            };
          }
          return cell;
        });
      }
      setCells(cells);
    }
  }, [activePage, pageConf?.cells, rest.apiUrl, showImage]);

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
    <MdCard id='admin-table' className='flex flex1'>
      <ProfileRole roles={['ADMIN']}>
        <div className='search-bar-provider flex flex-row'>
          <MdSearchBar className='flex1' callBack={handleSearch} search={state?.filter?.search} />
          <div className='flex gap5'>
            <MdButton
              className='button-icon'
              icon='add'
              color='secondary'
              callback={handleNavigate('/admin/update/' + activePage + '/-1')}
            />
            <AppButtonRefresh data={search} callback={handleSearch} />
          </div>
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
      </ProfileRole>
    </MdCard>
  );
});
