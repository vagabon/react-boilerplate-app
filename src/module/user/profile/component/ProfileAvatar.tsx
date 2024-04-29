import {
  IApiDto,
  IconClickable,
  JSONObject,
  MdAvatar,
  MdCardMedia,
  MdFormFile,
  ObjectUtils,
} from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, memo, useCallback } from 'react';
import { useModal } from '../../../../hook/modal/useModal';
import { useAppImage } from '../../../../template/hook/useAppImage';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import CustomModaleForm from '../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../user/dto/UserDto';
import { useUser } from '../../user/hook/useUser';

export interface IProfileAvatarProps {
  apiUrl: string;
  user: IUserDto;
  disabled?: boolean;
}

const ProfileAvatar: React.FC<IProfileAvatarProps> = memo(({ apiUrl, user, disabled }) => {
  const { handleUpdateAvatar, isUserPassword } = useUser(apiUrl);
  const { getImage } = useAppImage(apiUrl);
  const { open, openModal, closeModal } = useModal();

  const { handleChangeFile } = useCustomFormUpload(apiUrl, 'user');

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
          <IconClickable callback={openModal}>
            <MdAvatar
              name={user.username}
              image={getImage(user.avatar as string)}
              sx={{
                height: '100px',
                width: '100px',
                fontSize: '5rem',
              }}
            />
          </IconClickable>
        </MdCardMedia>
      )}
      {isUserPassword(user) && !disabled && (
        <CustomModaleForm
          open={open}
          title='AUTH:USER.AVATAR.TITLE'
          initialValues={{}}
          validationSchema={{}}
          callbackOpen={closeModal}
          button='AUTH:USER.AVATAR.BUTTON'>
          {(modalProps) => (
            <MdFormFile
              label='Avatar'
              name='avatar'
              handleChangeFile={handleChangeFile(user.id, callbackFile(modalProps.closeModal))}
              {...modalProps}
            />
          )}
        </CustomModaleForm>
      )}
    </>
  );
});

export default ProfileAvatar;
