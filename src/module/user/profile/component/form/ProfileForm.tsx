import { MdDivider, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import HasRole from '../../../../../hook/role/HasRole';
import { IBaseCustomSeoProps } from '../../../../custom/seo/component/CustomSeo';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';
import { IProfileDto } from '../../dto/ProfileDto';
import ProfileFormEmail from './ProfileFormEmail';
import ProfileFormPassword from './ProfileFormPassword';

export interface IProfileFormProps extends IBaseCustomSeoProps {
  apiUrl: string;
  user: IUserDto;
  disabled?: boolean;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ user, disabled, ...rest }) => {
  const { Trans } = useAppTranslate();
  const { isUserPassword } = useUser(rest.apiUrl);

  return (
    <div className='profile-form'>
      {!disabled && (
        <>
          <MdDivider />
          <ProfileFormEmail {...rest} user={user} />
        </>
      )}

      {isUserPassword(user) && !disabled && (
        <>
          <MdDivider />
          <ProfileFormPassword {...rest} user={user} />
        </>
      )}

      <HasRole roles={['ADMIN']} showError={false}>
        <MdDivider />
        <div>
          <b>
            <Trans i18nKey={'AUTH:FIELDS.ROLES'} />:
          </b>
          {user?.profiles?.map((role: IProfileDto) => <span key={role.id}> {role.name} </span>)}
        </div>
      </HasRole>
    </div>
  );
};

export default ProfileForm;
