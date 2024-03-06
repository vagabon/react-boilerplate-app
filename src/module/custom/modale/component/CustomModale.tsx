import {
  ButtonColorType,
  ID,
  IconClickable,
  IconColorType,
  MdButton,
  MdCommonModal,
} from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect } from 'react';
import { useModal } from '../../../../hook/modal/useModal';

export interface ICustomModaleChildProps {
  className?: string;
  icon?: string;
  iconColor?: IconColorType;
  button?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonColor?: ButtonColorType;
  open?: boolean;
  callbackOpen?: () => void;
}

export type ICustomModalChildrenType = (props: {
  openModal?: () => void;
  closeModal?: () => void;
  handleYes?: (id: ID, callback?: (id: ID) => void) => () => void;
}) => React.JSX.Element;

export interface ICustomModaleProps extends ICustomModaleChildProps {
  disabled?: boolean;
  children: ICustomModalChildrenType;
}

const CustomModale: React.FC<ICustomModaleProps> = ({
  className,
  icon,
  iconColor,
  button,
  buttonSize,
  buttonColor,
  disabled,
  children,
  ...rest
}) => {
  const { open, openModal, closeModal, handleYes } = useModal();

  useEffect(() => {
    rest.open ? openModal() : closeModal();
  }, [rest.open, openModal, closeModal]);

  const handleClose = useCallback(
    (callback?: () => void) => () => {
      closeModal();
      callback?.();
    },
    [closeModal],
  );

  return (
    <>
      <MdCommonModal className={className} open={open} handleClose={handleClose(rest.callbackOpen)}>
        {children({ openModal: openModal, closeModal: handleClose(rest.callbackOpen), handleYes })}
      </MdCommonModal>
      {icon && <IconClickable color={iconColor} icon={icon} callback={openModal} disabled={disabled} />}
      {button && (
        <MdButton size={buttonSize} label={button} color={buttonColor} callback={openModal} disabled={disabled} />
      )}
    </>
  );
};

export default CustomModale;
