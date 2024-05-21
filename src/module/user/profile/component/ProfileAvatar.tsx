import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { MdAvatar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/avatar/MdAvatar';
import { MdCardMedia } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/media/MdCardMedia';
import { MdFormFile } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/file/MdFormFile';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
import { ChangeEvent, memo, useCallback } from 'react';
import { useAppImage } from '../../../../app/image/hook/useAppImage';
import { useModal } from '../../../../hook/modal/useModal';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import { CustomModaleForm } from '../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../user/dto/UserDto';
import { useUser } from '../../user/hook/useUser';

export interface IProfileAvatarProps {
  apiUrl: string;
  user: IUserDto;
  disabled?: boolean;
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> = memo(({ apiUrl, user, disabled }) => {
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
              handleChangeFile={handleChangeFile(callbackFile(modalProps.closeModal))}
              {...modalProps}
            />
          )}
        </CustomModaleForm>
      )}
    </>
  );
});
