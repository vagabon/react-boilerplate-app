import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { memo } from 'react';
import { HasRole } from '../../../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../../../custom/seo/component/CustomSeo';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';
import { IProfileDto } from '../../dto/ProfileDto';
import { ProfileFormEmail } from './ProfileFormEmail';
import { ProfileFormParam } from './ProfileFormParam';
import { ProfileFormPassword } from './ProfileFormPassword';

export interface IProfileFormProps extends IBaseCustomSeoProps {
  apiUrl: string;
  user: IUserDto;
  disabled?: boolean;
}

export const ProfileForm: React.FC<IProfileFormProps> = memo(({ user, disabled, ...rest }) => {
  const { isUserPassword } = useUser(rest.apiUrl);

  return (
    <div className='profile-form'>
      {!disabled && (
        <>
          <ProfileFormParam {...rest} />
          <MdDivider />
        </>
      )}

      {isUserPassword(user) && !disabled && (
        <>
          <ProfileFormEmail {...rest} user={user} />
          <MdDivider />
          <ProfileFormPassword {...rest} user={user} />
        </>
      )}

      <HasRole roles={['ADMIN']} showError={false}>
        <MdDivider />
        <div>
          <MdTypo content={'AUTH:FIELDS.ROLES'} component='b' />:
          {user?.profiles?.map((role: IProfileDto) => <span key={role.id}> {role.name} </span>)}
        </div>
      </HasRole>
    </div>
  );
});
