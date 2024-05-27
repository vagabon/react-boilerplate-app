import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IconClickable, IconType } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { MdBadge } from '@vagabond-inc/react-boilerplate-md/dist/md/component/badge/MdBadge';
import { ButtonColorType, MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdModal } from '@vagabond-inc/react-boilerplate-md/dist/md/component/modal/MdModal';
import { memo, useCallback, useEffect } from 'react';
import { useModal } from '../../../../app/modal/hook/useModal';

export interface ICustomModaleChildProps {
  className?: string;
  classNameButton?: string;
  icon?: string;
  iconColor?: IconType;
  iconBadge?: number;
  iconBadgeColor?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  button?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonColor?: ButtonColorType;
  buttonVariant?: 'text' | 'outlined' | 'contained';
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

export const CustomModale: React.FC<ICustomModaleProps> = memo(
  ({
    className,
    icon,
    iconColor,
    iconBadge,
    iconBadgeColor,
    button,
    buttonSize,
    buttonColor,
    disabled,
    buttonVariant,
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
        <MdModal className={className} open={open} callbackClose={handleClose(rest.callbackOpen)}>
          {children({ openModal: openModal, closeModal: handleClose(rest.callbackOpen), handleYes })}
        </MdModal>
        {icon && iconColor && <IconClickable color={iconColor} icon={icon} callback={openModal} disabled={disabled} />}
        {(button || buttonColor) && (
          <MdBadge badgeContent={iconBadge ?? 0} color={iconBadgeColor ?? 'primary'}>
            <MdButton
              className={(icon ? 'button-icon ' : '') + rest.classNameButton}
              size={buttonSize}
              label={button}
              color={buttonColor}
              icon={icon}
              variant={buttonVariant ?? 'contained'}
              callback={openModal}
              disabled={disabled}
            />
          </MdBadge>
        )}
      </>
    );
  },
);
