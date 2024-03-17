import { ID, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import CustomList from '../../list/component/CustomList';
import { useCustomNotification } from '../hook/useCustomNotification';

export interface ICustomNotificationProps {
  apiUrl: string;
  entityId: ID;
  type: string;
}

const CustomNotification: React.FC<ICustomNotificationProps> = ({ apiUrl, entityId, type }) => {
  const { notifications, custumList, search, page, doSearch, doChangePage } = useCustomNotification(
    apiUrl,
    entityId,
    type,
  );

  useEffect(() => {
    doSearch([])('');
  }, [doSearch]);

  return (
    <MdCard>
      <InfiniteScrollPage
        isCard={false}
        search={search}
        className='news-list'
        doChangePage={doChangePage(notifications, page)}
        doSearch={doSearch([])}>
        <CustomList apiUrl={apiUrl} datas={custumList} />
      </InfiniteScrollPage>
    </MdCard>
  );
};

export default CustomNotification;
