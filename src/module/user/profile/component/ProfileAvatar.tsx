import {
  IApiDto,
  JSONObject,
  MdAvatar,
  MdCardMedia,
  MdFormFile,
  ObjectUtils,
} from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, useCallback } from 'react';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import CustomModaleForm from '../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../user/dto/UserDto';
import { useUser } from '../../user/hook/useUser';

export interface IProfileAvatarProps {
  user: IUserDto;
  disabled?: boolean;
}

const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ user, disabled }) => {
  const { handleUpdateAvatar, isUserPassword } = useUser();

  const { handleChangeFile } = useCustomFormUpload('user');

  const callbackFile = useCallback(
    (callback?: () => void) => (event: ChangeEvent<JSONObject>) => {
      const avatar = ObjectUtils.getDtoString(event.target as IApiDto, 'value');
      handleUpdateAvatar(avatar, callback);
    },
    [handleUpdateAvatar],
  );

  return (
    <>
      {user.username && (
        <MdCardMedia>
          <MdAvatar
            name={user.username}
            image={user.avatar}
            sx={{
              height: disabled ? '100px' : '200px',
              width: disabled ? '100px' : '200px',
              fontSize: disabled ? '5rem' : '10rem',
            }}
          />
        </MdCardMedia>
      )}
      {isUserPassword(user) && !disabled && (
        <CustomModaleForm
          small={true}
          title='AUTH:USER.AVATAR.TITLE'
          initialValues={{}}
          validationSchema={{}}
          button='AUTH:USER.AVATAR.BUTTON'>
          {(props) => (
            <MdFormFile
              label='Avatar'
              name='avatar'
              handleChangeFile={handleChangeFile(user.id, callbackFile(props.closeModal))}
              {...props}
            />
          )}
        </CustomModaleForm>
      )}
    </>
  );
};

export default ProfileAvatar;
