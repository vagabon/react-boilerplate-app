import { IApiDto, JSONObject, MdButton, MdFormFile, ObjectUtils } from '@vagabond-inc/react-boilerplate-md';
import { ChangeEvent, useCallback } from 'react';
import { useModal } from '../../../../hook/modal/useModal';
import { useCustomFormUpload } from '../../form/hook/useCustomFormUpload';
import CustomModaleForm from '../../modale/component/CustomModaleForm';

export interface ICustomFileProps {
  apiUrl: string;
  title: string;
  directory: string;
  variant?: 'text' | 'outlined' | 'contained';
  callback: (file: string, closeModale?: () => void) => void;
}

const CustomFile: React.FC<ICustomFileProps> = ({ apiUrl, title, directory, variant = 'contained', callback }) => {
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
      <MdButton icon='upload' className='button-icon' variant={variant} callback={openModal} />
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
export default CustomFile;
