import {
  IMdInputTextProps,
  MdInputText,
} from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { memo, useCallback } from 'react';
import { IYupValidators } from '../../../../../utils/yup/YupUtils';
import { CustomModaleForm } from '../../../../custom/modale/component/CustomModaleForm';
import { IBaseCustomSeoProps } from '../../../../custom/seo/component/CustomSeo';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';

const SCHEMA: IYupValidators = {
  password: {
    type: 'password',
    required: true,
    regexp: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[-_@$!%*?&])[A-Za-z\\d-_@$!%*?&]{8,}$',
    regexpError: 'ERRORS:FORMAT_PASSWORD',
  },
  newPassword: {
    type: 'password',
    required: true,
    regexp: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[-_@$!%*?&])[A-Za-z\\d-_@$!%*?&]{8,}$',
    regexpError: 'ERRORS:FORMAT_PASSWORD',
  },
  newPasswordConfirm: {
    type: 'password',
    required: true,
    regexp: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[-_@$!%*?&])[A-Za-z\\d-_@$!%*?&]{8,}$',
    regexpError: 'ERRORS:FORMAT_PASSWORD',
    same: 'newPassword',
    sameLabel: 'ERRORS:SAME_PASSWORD',
  },
};

export interface IProfileFormPasswordProps extends IBaseCustomSeoProps {
  user?: IUserDto;
}

export const ProfileFormPassword: React.FC<IProfileFormPasswordProps> = memo(({ user, ...rest }) => {
  const { handleUpdatePassword } = useUser(rest.apiUrl);

  const handleSubmit = useCallback(
    (callback?: () => void) => (data: IUserDto) => {
      handleUpdatePassword(user?.id, data.password as string, data.newPassword as string, callback);
    },
    [user, handleUpdatePassword],
  );

  return (
    <div className='flex flex-row align-center justify-end'>
      <CustomModaleForm
        small={true}
        title='AUTH:USER.PASSWORD.TITLE'
        initialValues={{}}
        validationSchema={SCHEMA}
        onSubmit={handleSubmit}
        button='AUTH:USER.PASSWORD.BUTTON'>
        {(props) => (
          <>
            <MdInputText
              {...(props as IMdInputTextProps)}
              label='AUTH:FIELDS.PASSWORD'
              name='password'
              type='password'
            />
            <MdInputText
              {...(props as IMdInputTextProps)}
              label='AUTH:FIELDS.PASSWORD_NEW'
              name='newPassword'
              type='password'
            />
            <MdInputText
              {...(props as IMdInputTextProps)}
              label='AUTH:FIELDS.PASSWORD_NEW_CONFIRM'
              name='newPasswordConfirm'
              type='password'
            />
          </>
        )}
      </CustomModaleForm>
    </div>
  );
});
