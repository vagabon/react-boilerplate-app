import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdMarkdown } from '@vagabond-inc/react-boilerplate-md/dist/md/component/markdown/MdMarkdown';
import { MdSearchBar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/searchbar/MdSearchBar';
import { ReactNode, memo, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { AppButtonRefresh } from '../../../app/button/component/refresh/AppButtonRefresh';
import { AppContent } from '../../../app/content/component/AppContent';
import { useAppSelector } from '../../../store/Store';
import { IHeaderDto } from '../../../template/dto/HeaderDto';
import { CustomModale } from '../../custom/modale/component/CustomModale';
import { CustomModaleConfirm } from '../../custom/modale/component/CustomModaleConfirm';
import { ProfileRole } from '../../user/profile/component/role/ProfileRole';
import { NotificationList } from '../component/list/NotificationList';
import { INotificationDto } from '../dto/NotificationDto';
import { useNotification } from '../hook/useNotification';
import { useNotificationFetch } from '../hook/useNotificationFetch';

export interface INotificationPageProps extends IHeaderDto {
  handleSelect: (notification: INotificationDto) => void;
  getNotificationIcon: (category: string) => void;
  header?: ReactNode;
}

export const NotificationPage: React.FC<INotificationPageProps> = memo(
  ({ handleSelect, getNotificationIcon, header, ...rest }) => {
    const userId = useAppSelector((state) => state.auth.user?.user?.id, shallowEqual);
    const { handleReadAll, handleCheckbox, handleClick, open, notification, closeModal } = useNotification(rest.apiUrl);
    const {
      notifications,
      count,
      page,
      search,
      doFetchNotifications,
      doSearchNotifications,
      doChangePageNotifications,
    } = useNotificationFetch(rest.apiUrl);

    useEffect(() => {
      page === 0 && userId && doFetchNotifications({ title: '' }, page, userId);
    }, [doFetchNotifications, page, userId]);

    return (
      <ProfileRole roles={['USER']} showError={true}>
        <AppContent {...rest} className='no-overflow' seo='SEO:NOTIFICATION'>
          <MdCard
            className='creator-card border border-secondary'
            icon='notification'
            title='NOTIFICATION'
            titleCount={count}
            actions={
              <>
                <CustomModaleConfirm button='READ_ALL' label='READ_ALL_CONFIRM' callback={handleReadAll()} />
                <AppButtonRefresh data={search} callback={doSearchNotifications(userId)} />
              </>
            }>
            {header && <div className='flex flex-row align-start width100 gap10'>{header}</div>}
            <MdSearchBar search={search} callBack={doSearchNotifications(userId)} />
          </MdCard>
          <NotificationList
            {...rest}
            notifications={notifications}
            getNotificationIcon={getNotificationIcon}
            callbackClick={handleClick(notifications)}
            callbackCheckbox={handleCheckbox(notifications)}
            callbackSettings={handleSelect}
            doChangePage={doChangePageNotifications(page, userId)}
          />
          <CustomModale className='modal-card modal-small' open={open} callbackOpen={closeModal}>
            {() => (
              <MdCard title={notification.title} date={notification.creationDate}>
                <div className='flex flex1 margin-top20'>
                  <div className='flex1'>
                    <MdMarkdown content={notification.message} />
                  </div>
                  <MdButton label='GO_TO' className='align-self-end' callback={() => handleSelect(notification)} />
                </div>
              </MdCard>
            )}
          </CustomModale>
        </AppContent>
      </ProfileRole>
    );
  },
);
