import { ID, MdButton, MdCard, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import CustomModale, { ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';

export interface ICustomModaleConfirmProps extends ICustomModaleChildProps {
  id?: ID;
  label?: string;
  disabled?: boolean;
  callback?: (id: ID) => void;
  children?: ICustomModalChildrenType;
}

const CustomModaleConfirm: React.FC<ICustomModaleConfirmProps> = memo(({ id, label, callback, children, ...rest }) => {
  const { Trans } = useAppTranslate();

  return (
    <CustomModale {...rest} className='modal-confirm'>
      {({ openModal, closeModal, handleYes }) => (
        <>
          {children?.({ openModal, closeModal, handleYes })}
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
        </>
      )}
    </CustomModale>
  );
});

export default CustomModaleConfirm;
