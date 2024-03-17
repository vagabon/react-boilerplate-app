import { ID, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import CustomList from '../../list/component/CustomList';
import { useCustomNotification } from '../hook/useCustomNotification';

export interface ICustomNotificationProps {
  entityId: ID;
  type: string;
}

const CustomNotification: React.FC<ICustomNotificationProps> = ({ entityId, type }) => {
  const { notifications, custumList, search, page, doSearch, doChangePage } = useCustomNotification(entityId, type);

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
        <CustomList datas={custumList} />
      </InfiniteScrollPage>
    </MdCard>
  );
};

export default CustomNotification;
