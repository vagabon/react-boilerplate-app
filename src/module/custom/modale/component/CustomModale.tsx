import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { IconColorType } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdBadge } from '@vagabond-inc/react-boilerplate-md/dist/md/component/badge/MdBadge';
import { ButtonColorType, MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCommonModal } from '@vagabond-inc/react-boilerplate-md/dist/md/component/modal/MdCommonModal';
import { memo, useCallback, useEffect } from 'react';
import { useModal } from '../../../../hook/modal/useModal';

export interface ICustomModaleChildProps {
  className?: string;
  icon?: string;
  iconColor?: IconColorType;
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
        <MdCommonModal className={className} open={open} handleClose={handleClose(rest.callbackOpen)}>
          {children({ openModal: openModal, closeModal: handleClose(rest.callbackOpen), handleYes })}
        </MdCommonModal>
        {icon && iconColor && <IconClickable color={iconColor} icon={icon} callback={openModal} disabled={disabled} />}
        {(button || buttonColor) && (
          <MdBadge content={iconBadge ?? 0} color={iconBadgeColor ?? 'primary'}>
            <MdButton
              className={icon ? 'button-icon' : ''}
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
