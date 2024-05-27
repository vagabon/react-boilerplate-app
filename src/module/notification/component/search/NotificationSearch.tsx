import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { memo, useEffect } from 'react';
import { AppInfiniteScrollProvider } from '../../../../app/scroll/component/infinite/provider/AppInfiniteScrollProvider';
import { CustomList } from '../../../custom/list/component/CustomList';
import { useNotificationSearch } from '../../hook/search/useNotificationSearch';

export interface INotificationSearchProps {
  apiUrl: string;
  entityId: ID;
  type: string;
}

export const NotificationSearch: React.FC<INotificationSearchProps> = memo(({ apiUrl, entityId, type }) => {
  const { notifications, custumList, search, page, doSearch, doChangePage } = useNotificationSearch(
    apiUrl,
    entityId,
    type,
  );

  useEffect(() => {
    doSearch([])('');
  }, [doSearch]);

  return (
    <MdCard>
      <AppInfiniteScrollProvider
        isCard={false}
        search={search}
        className='news-list'
        doChangePage={doChangePage(notifications, page)}
        doSearch={doSearch([])}>
        <CustomList apiUrl={apiUrl} datas={custumList} />
      </AppInfiniteScrollProvider>
    </MdCard>
  );
});
