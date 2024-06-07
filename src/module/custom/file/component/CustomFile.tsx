import { IApiDto, JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdFormFile } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/file/MdFormFile';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
import { ChangeEvent, useCallback } from 'react';
import { useModal } from '../../../../app/modal/hook/useModal';
import { useCustomFormUpload } from '../../form/hook/useCustomFormUpload';
import { CustomModaleForm } from '../../modale/component/CustomModaleForm';

export interface ICustomFileProps {
  apiUrl: string;
  title: string;
  directory: string;
  variant?: 'text' | 'outlined' | 'contained';
  callback: (file: string, closeModale?: () => void) => void;
}

export const CustomFile: React.FC<ICustomFileProps> = ({
  apiUrl,
  title,
  directory,
  variant = 'contained',
  callback,
}) => {
  const { open, openModal, closeModal } = useModal();

  const { handleChangeFile } = useCustomFormUpload(apiUrl, directory);

  const doChangeFile = useCallback(
    (callback: (file: string, closeModale?: () => void) => void, closeModale?: () => void) =>
      (event: ChangeEvent<JSONObject>) => {
        const avatar = ObjectUtils.getDtoString(event.target as IApiDto, 'value');
        callback(avatar, closeModale);
      },
    [],
  );

  return (
    <>
      <MdButton
        icon='upload'
        color='secondary'
        className='button-icon'
        variant={variant}
        callback={openModal}
      />
      <CustomModaleForm open={open} icon='upload' title={title} callbackOpen={closeModal}>
        {(modalProps) => (
          <MdFormFile
            label='Avatar'
            name='avatar'
            handleChangeFile={handleChangeFile(doChangeFile(callback, modalProps.closeModal))}
            {...modalProps}
          />
        )}
      </CustomModaleForm>
    </>
  );
};
