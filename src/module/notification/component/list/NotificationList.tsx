import { IApiDto, ID, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect, useState } from 'react';
import InfiniteScrollPage from '../../../../page/InfiniteScrollPage';
import CustomList, { ICustomListDto } from '../../../custom/list/component/CustomList';
import { INotificationDto } from '../../dto/NotificationDto';
import { NotificationUtils } from '../../utils/NotificationUtils';

export interface INotificationListProps {
  notifications: INotificationDto[];
  doChangePage: (pageToAdd: number) => void;
  callbackClick: (data: IApiDto) => void;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  callbackSettings?: (data: IApiDto) => void;
}

const NotificationList: React.FC<INotificationListProps> = ({
  notifications,
  doChangePage,
  callbackClick,
  callbackCheckbox,
  callbackSettings,
}) => {
  const [custumList, setCustumList] = useState<ICustomListDto[]>(NotificationUtils.convertToCustomList(notifications));

  useEffect(() => {
    setCustumList(NotificationUtils.convertToCustomList(notifications));
  }, [notifications]);

  return (
    <InfiniteScrollPage doChangePage={doChangePage}>
      <MdCard>
        <CustomList
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
