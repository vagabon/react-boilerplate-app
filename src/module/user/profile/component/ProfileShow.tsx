import { ID, MdBouttonGroup, MdButton, MdCard, MdDivider } from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import React, { useCallback } from 'react';
import { useApiService } from '../../../../api/hook/useApiService';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { useUserAuth } from '../../../../hook/user/useUserAuth';
import { useAppSelector } from '../../../../store/Store';
import CustomModaleConfirm from '../../../custom/modale/component/CustomModaleConfirm';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import { IUserDto } from '../../user/dto/UserDto';
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './form/ProfileForm';

export interface IProfileShowProps extends IBaseCustomSeoProps {
  i18n?: i18nType;
  user: IUserDto;
  disabled?: boolean;
  profileReact: (id: ID) => JSX.Element;
  profileReactChildren?: (id: ID) => JSX.Element;
}

const ProfileShow: React.FC<IProfileShowProps> = ({
  i18n,
  user,
  disabled,
  profileReact,
  profileReactChildren,
  ...rest
}) => {
  const { handleLogout } = useUserAuth();
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { httpPost } = useApiService(rest.apiUrl);

  const handleSendNotification = useCallback(() => {
    httpPost('/notification/send', {});
  }, [httpPost]);

  const handleSendEmail = useCallback(() => {
    httpPost('/email/produce', {});
  }, [httpPost]);

  return (
    <AppContent
      {...rest}
      className='flex1 profil-content'
      seoTitle='SEO:PROFIL.TITLE'
      seoDescription='SEO:PROFIL.DESCRIPTION'>
      <MdCard
        icon='profile'
        title={user?.username}
        buttonchildren={
          <>
            {currentUser?.user?.id === user.id && !disabled && (
              <CustomModaleConfirm button='COMMON:LOGOUT' buttonColor='error' callback={handleLogout} />
            )}
          </>
        }>
        <div className='flex align-center' style={{ flex: '0.4' }}>
          <ProfileAvatar {...rest} user={user} disabled={disabled} />
        </div>
        <div className='flex flex1'>
          {profileReact(user.id)}

          <ProfileForm {...rest} i18n={i18n} user={user} disabled={disabled} />

          <HasRole roles={['ADMIN']} showError={false}>
            <MdDivider />
            <MdBouttonGroup sx={{ gap: '10px', justifyContent: 'flex-end', margin: '10px 5px' }}>
              <MdButton label='SEND_NOTIFICATION' callback={handleSendNotification} />
              <MdButton label='SEND_MAIL' callback={handleSendEmail} />
            </MdBouttonGroup>
          </HasRole>
        </div>
      </MdCard>
      {profileReactChildren?.(user.id)}
    </AppContent>
  );
};

export default ProfileShow;
