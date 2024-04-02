import { IApiDto, ID, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect, useState } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import CustomList, { ICustomListDto } from '../../../custom/list/component/CustomList';
import { INotificationDto } from '../../dto/NotificationDto';
import { NotificationUtils } from '../../utils/NotificationUtils';

export interface INotificationListProps {
  apiUrl: string;
  notifications: INotificationDto[];
  getNotificationIcon: (category: string) => void;
  doChangePage: (pageToAdd: number) => void;
  callbackClick: (data: IApiDto) => void;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  callbackSettings?: (data: IApiDto) => void;
}

const NotificationList: React.FC<INotificationListProps> = ({
  apiUrl,
  notifications,
  getNotificationIcon,
  doChangePage,
  callbackClick,
  callbackCheckbox,
  callbackSettings,
}) => {
  const [custumList, setCustumList] = useState<ICustomListDto[]>(
    NotificationUtils.convertToCustomList(notifications, getNotificationIcon),
  );

  useEffect(() => {
    setCustumList(NotificationUtils.convertToCustomList(notifications, getNotificationIcon));
  }, [notifications, getNotificationIcon]);

  return (
    <InfiniteScrollPage doChangePage={doChangePage}>
      <MdCard>
        <CustomList
          apiUrl={apiUrl}
          className='notification-list'
          callback={callbackClick}
          callbackCheckbox={callbackCheckbox}
          iconSettings='right'
          callbackSettings={callbackSettings}
          datas={custumList}
        />
      </MdCard>
    </InfiniteScrollPage>
  );
};

export default NotificationList;
