import { MdButton, MdCard, MdMarkdown, MdSearchBar } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, useEffect } from 'react';
import AppButtonRefresh from '../../../app/button/component/refresh/AppButtonRefresh';
import AppContent from '../../../app/content/AppContent';
import HasRole from '../../../hook/role/HasRole';
import { useAuth } from '../../auth/hook/useAuth';
import CustomModale from '../../custom/modale/component/CustomModale';
import CustomModaleConfirm from '../../custom/modale/component/CustomModaleConfirm';
import NotificationList from '../component/list/NotificationList';
import { INotificationDto } from '../dto/NotificationDto';
import { useNotification } from '../hook/useNotification';
import { useNotificationFetch } from '../hook/useNotificationFetch';

export interface INotificationPageProps {
  handleSelect: (notification: INotificationDto) => void;
  header: ReactNode;
}

const NotificationPage: React.FC<INotificationPageProps> = ({ handleSelect, header }) => {
  const { user } = useAuth();
  const { handleReadAll, handleCheckbox, handleClick, open, notification, closeModal } = useNotification();
  const { notifications, count, page, search, doFetchNotifications, doSearchNotifications, doChangePageNotifications } =
    useNotificationFetch();

  useEffect(() => {
    page === 0 && user?.id && doFetchNotifications({ title: '' }, page, user?.id);
  }, [doFetchNotifications, page, user?.id]);

  return (
    <HasRole roles={['USER']} showError={true}>
      <AppContent
        className='no-overflow'
        seoTitle='SEO:NOTIFICATION.TITLE'
        seoDescription='SEO:NOTIFICATION.DESCRIPTION'>
        <MdCard
          className='creator-card border border-secondary'
          icon='notification'
          title='NOTIFICATION'
          titleCount={count}
          actions={
            <>
              <CustomModaleConfirm button='READ_ALL' label='READ_ALL_CONFIRM' callback={handleReadAll()} />
              <AppButtonRefresh callback={() => doSearchNotifications(user?.id)(search)} />
            </>
          }>
          <div className='flex flex-row align-start width100 gap10'>{header}</div>
          <MdSearchBar search={search} callBack={doSearchNotifications(user?.id)} />
        </MdCard>
        <NotificationList
          notifications={notifications}
          callbackClick={handleClick(notifications)}
          callbackCheckbox={handleCheckbox(notifications)}
          callbackSettings={handleSelect}
          doChangePage={doChangePageNotifications(page, user?.id)}
        />
        <CustomModale className='modal-card modal-small' open={open} callbackOpen={closeModal}>
          {() => (
            <MdCard title={notification.title} date={notification.creationDate}>
              <div className='flex flex1' style={{ marginTop: '20px' }}>
                <div className='flex1'>
                  <MdMarkdown content={notification.message} />
                </div>
                <MdButton label='GO_TO' callback={() => handleSelect(notification)} sx={{ alignSelf: 'end' }} />
              </div>
            </MdCard>
          )}
        </CustomModale>
      </AppContent>
    </HasRole>
  );
};

export default NotificationPage;
