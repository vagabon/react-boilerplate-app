import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { memo } from 'react';
import { CustomModale, ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';

export interface ICustomModaleConfirmProps extends ICustomModaleChildProps {
  id?: ID;
  label?: string;
  disabled?: boolean;
  callback?: (id: ID) => void;
  children?: ICustomModalChildrenType;
}

export const CustomModaleConfirm: React.FC<ICustomModaleConfirmProps> = memo(
  ({ id, label, callback, children, className = '', ...rest }) => {
    return (
      <CustomModale {...rest} className={'modal-confirm ' + className}>
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
              <MdTypo content={label ?? 'CONFIRMATION.MESSAGE'} />
            </MdCard>
          </>
        )}
      </CustomModale>
    );
  },
);
