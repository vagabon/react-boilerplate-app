import {
  IMdInputTextProps,
  MdInputText,
} from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { memo, useCallback } from 'react';
import { IYupValidators } from '../../../../../utils/yup/YupUtils';
import { CustomModaleForm } from '../../../../custom/modale/component/CustomModaleForm';
import { IBaseCustomSeoProps } from '../../../../custom/seo/component/CustomSeo';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';

const SCHEMA: IYupValidators = {
  email: {
    email: true,
    required: true,
  },
  emailConfirm: {
    email: true,
    required: true,
    same: 'email',
    sameLabel: 'ERRORS:SAME_EMAIL',
  },
};

export interface IProfileFormEmailProps extends IBaseCustomSeoProps {
  user: IUserDto;
}

export const ProfileFormEmail: React.FC<IProfileFormEmailProps> = memo(({ user, ...rest }) => {
  const { handleUpdateEmail } = useUser(rest.apiUrl);

  const handleSubmit = useCallback(
    (callback?: () => void) => (data: IUserDto) => {
      handleUpdateEmail(user?.id, data.email as string, callback);
    },
    [user, handleUpdateEmail],
  );

  return (
    <div className='flex flex-row align-center space-between'>
      <MdTypo content='AUTH:FIELDS.EMAIL' component='b' />
      <span>{user?.email}</span>
      <CustomModaleForm
        title='AUTH:USER.EMAIL.TITLE'
        initialValues={{}}
        validationSchema={SCHEMA}
        onSubmit={handleSubmit}
        button='AUTH:USER.EMAIL.BUTTON'>
        {(props) => (
          <>
            <MdInputText {...(props as IMdInputTextProps)} label='AUTH:FIELDS.EMAIL' name='email' />
            <MdInputText {...(props as IMdInputTextProps)} label='AUTH:FIELDS.EMAIL_CONFIRM' name='emailConfirm' />
          </>
        )}
      </CustomModaleForm>
    </div>
  );
});
