import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { useAppTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useAppTranslate';
import { type i18n as i18nType } from 'i18next';
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
  i18n?: i18nType;
  apiUrl: string;
  user: IUserDto;
  disabled?: boolean;
}

export const ProfileForm: React.FC<IProfileFormProps> = memo(({ i18n, user, disabled, ...rest }) => {
  const { Trans } = useAppTranslate();
  const { isUserPassword } = useUser(rest.apiUrl);

  return (
    <div className='profile-form'>
      {!disabled && (
        <>
          <ProfileFormParam {...rest} i18n={i18n} />
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
          <b>
            <Trans i18nKey={'AUTH:FIELDS.ROLES'} />:
          </b>
          {user?.profiles?.map((role: IProfileDto) => <span key={role.id}> {role.name} </span>)}
        </div>
      </HasRole>
    </div>
  );
});
