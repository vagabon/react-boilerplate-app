import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdBouttonGroup } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/group/MdBouttonGroup';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import React, { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useApiService } from '../../../../api/hook/useApiService';
import { useAppSelector } from '../../../../store/Store';
import { useAuthLogout } from '../../../auth/hook/logout/useAuthLogout';
import { CustomModaleConfirm } from '../../../custom/modale/component/CustomModaleConfirm';
import { IUserDto } from '../../user/dto/UserDto';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileForm } from './form/ProfileForm';
import { ProfileRole } from './role/ProfileRole';

export interface IProfileShowProps {
  apiUrl: string;
  user: IUserDto;
  disabled?: boolean;
  profileReact: (id: ID) => React.JSX.Element;
  profileReactChildren?: (id: ID) => React.JSX.Element;
}

export const ProfileShow: React.FC<IProfileShowProps> = ({
  user,
  disabled,
  profileReact,
  profileReactChildren,
  ...rest
}) => {
  const { handleLogout } = useAuthLogout();
  const currentUserId = useAppSelector((state) => state.auth?.user?.user?.id, shallowEqual);
  const { httpPost } = useApiService(rest.apiUrl);

  const handleSendNotification = useCallback(() => {
    httpPost('/notification/send', {});
  }, [httpPost]);

  const handleSendEmail = useCallback(() => {
    httpPost('/email/produce', {});
  }, [httpPost]);

  return (
    <MdCard
      icon='profile'
      title={user?.username}
      buttonchildren={
        <>
          {currentUserId === user.id && !disabled && (
            <CustomModaleConfirm
              button='COMMON:LOGOUT'
              label='COMMON:LOGOUT_LABEL'
              buttonColor='error'
              callback={handleLogout}
            />
          )}
        </>
      }>
      <div className='flex align-center' style={{ flex: '0.3' }}>
        {profileReactChildren?.(user.id)}
        <ProfileAvatar {...rest} user={user} disabled={disabled} />
      </div>
      <div className='flex flex1'>
        {profileReact(user.id)}

        <ProfileForm {...rest} user={user} disabled={disabled} />

        <ProfileRole roles={['ADMIN']} showError={false}>
          <MdDivider />
          <MdBouttonGroup sx={{ gap: '10px', justifyContent: 'flex-end', margin: '10px 5px' }}>
            <MdButton label='SEND_NOTIFICATION' callback={handleSendNotification} />
            <MdButton label='SEND_MAIL' callback={handleSendEmail} />
          </MdBouttonGroup>
        </ProfileRole>
      </div>
    </MdCard>
  );
};
