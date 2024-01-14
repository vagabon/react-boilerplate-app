import { MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import CustomList from '../../list/component/CustomList';
import { useCustomNotification } from '../hook/useCustomNotification';

export interface ICustomNotificationProps {}

const CustomNotification: React.FC<ICustomNotificationProps> = () => {
  const { notifications, custumList, search, page, doSearch, doChangePage } = useCustomNotification();

  useEffect(() => {
    doSearch([])('');
  }, [doSearch]);

  return (
    <MdCard>
      <InfiniteScrollPage
        search={search}
        className='news-list'
        doChangePage={doChangePage(notifications, page)}
        doSearch={doSearch(notifications)}>
        <CustomList datas={custumList} />
      </InfiniteScrollPage>
    </MdCard>
  );
};

export default CustomNotification;
