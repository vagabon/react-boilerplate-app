import { ID, MdButton, MdCard, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import CustomModale, { ICustomModaleChildProps } from './CustomModale';

export interface ICustomModaleConfirmProps extends ICustomModaleChildProps {
  id?: ID;
  label?: string;
  disabled?: boolean;
  callback?: (id: ID) => void;
}

const CustomModaleConfirm: React.FC<ICustomModaleConfirmProps> = ({ id, label, callback, ...rest }) => {
  const { Trans } = useAppTranslate();

  return (
    <CustomModale {...rest} className='modal-confirm'>
      {({ closeModal, handleYes }) => (
        <MdCard
          title='CONFIRMATION.TITLE'
          buttonchildren={
            <>
              <MdButton label='COMMON:NO' variant='text' callback={closeModal} />
              <MdButton label='COMMON:YES' callback={handleYes?.(id, callback)} />
            </>
          }>
          <Trans i18nKey={label ?? 'CONFIRMATION.MESSAGE'} />
        </MdCard>
      )}
    </CustomModale>
  );
};

export default CustomModaleConfirm;
