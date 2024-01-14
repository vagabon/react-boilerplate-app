import {
  ButtonColorType,
  ID,
  IconClickable,
  IconColorType,
  MdButton,
  MdCommonModal,
} from '@vagabond-inc/react-boilerplate-md';
import { useModal } from '../../../../hook/modal/useModal';

export interface ICustomModaleChildProps {
  className?: string;
  icon?: string;
  iconColor?: IconColorType;
  button?: string;
  buttonColor?: ButtonColorType;
}

export type ICustomModalChildrenType = (props: {
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
  buttonColor,
  disabled,
  children,
}) => {
  const { open, openModal, closeModal, handleYes } = useModal();

  return (
    <>
      <MdCommonModal className={className} open={open} handleClose={closeModal}>
        {children({ closeModal, handleYes })}
      </MdCommonModal>
      {icon && <IconClickable color={iconColor} icon={icon} callback={openModal} disabled={disabled} />}
      {button && <MdButton label={button} color={buttonColor} callback={openModal} disabled={disabled} />}
    </>
  );
};

export default CustomModale;
