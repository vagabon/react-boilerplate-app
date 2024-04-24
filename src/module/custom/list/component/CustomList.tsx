import {
  IApiDto,
  ID,
  IconClickable,
  MdAvatar,
  MdChip,
  MdDivider,
  MdFormCheckboxSimple,
  MdList,
  MdListItem,
  MdListItemAvatar,
  MdListItemIcon,
  MdListItemText,
  useAppTranslate,
} from '@vagabond-inc/react-boilerplate-md';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useMessage } from '../../../../hook/message/useMessage';
import { useAppImage } from '../../../../template/hook/useAppImage';
import CustomModaleConfirm from '../../modale/component/CustomModaleConfirm';

export interface ICustomListDto {
  avatar?: string;
  user?: IApiDto;
  icon?: string;
  chip?: string;
  name: string;
  secondary?: string;
  checked?: boolean;
  disabled?: boolean;
  entity: IApiDto;
}

export interface ICustomListProps {
  apiUrl: string;
  className?: string;
  icon?: string;
  chipClassName?: string;
  datas: ICustomListDto[];
  buttonChildren?: (data: IApiDto) => JSX.Element;
  callback?: (data: IApiDto) => void;
  callbackAvatar?: (data: IApiDto) => () => void;
  isCheckboxColor?: boolean;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  callbackDelete?: (id: ID) => void;
  iconSettings?: string;
  callbackSettings?: (data: IApiDto) => void;
}

const CustomList: React.FC<ICustomListProps> = memo(
  ({
    apiUrl,
    className = '',
    datas,
    icon,
    chipClassName,
    buttonChildren,
    callback,
    callbackAvatar,
    isCheckboxColor,
    callbackCheckbox,
    callbackDelete,
    iconSettings = 'settings',
    callbackSettings,
  }) => {
    const { t } = useAppTranslate();
    const [disabled, setDisabled] = useState<boolean>();
    const { message } = useMessage();
    const { getImage } = useAppImage(apiUrl);

    useEffect(() => {
      if (message !== '') {
        setDisabled(false);
      }
    }, [message]);

    const handleClick = useCallback(
      (data: IApiDto) => () => {
        callback?.(data);
      },
      [callback],
    );

    const handleClickChecbox = useCallback(
      (id: ID, checked: boolean, callback?: (id: ID, checked: boolean) => void) => () => {
        setDisabled(true);
        callback?.(id, checked);
      },
      [],
    );

    const getIconColor = useCallback(
      (checked?: boolean) => {
        if (!callbackCheckbox) {
          return 'info';
        } else {
          return checked ? 'success' : 'error';
        }
      },
      [callbackCheckbox],
    );

    const getTextColor = useCallback(
      (checked?: boolean) => {
        return checked && isCheckboxColor ? 'success' : '';
      },
      [isCheckboxColor],
    );

    const handleClickAvatar = useCallback(
      (data: IApiDto) => () => {
        if (callbackAvatar) {
          callbackAvatar?.(data)();
        } else {
          callback?.(data);
        }
      },
      [callbackAvatar, callback],
    );

    return (
      <MdList className={'custom-list overflow overflow-x-none ' + className}>
        {!datas || datas.length === 0 ? (
          <MdListItem className='no-animate' component='div' disablePadding>
            <MdListItem className='no-animate'>
              <MdListItemText color='flex align-center' label={t('NO_RESULT')} />
            </MdListItem>
          </MdListItem>
        ) : (
          datas?.map((data) => (
            <Fragment key={'custom-list-' + data.name + data.entity.id}>
              <MdListItem
                component='div'
                disablePadding
                callback={handleClick(data.entity)}
                isCursor={callback !== undefined}>
                {data.avatar && (
                  <MdListItemAvatar>
                    <MdAvatar
                      name={data.avatar}
                      image={getImage(data.avatar)}
                      callback={handleClickAvatar(data.user as IApiDto)}
                    />
                  </MdListItemAvatar>
                )}
                {callbackCheckbox && (
                  <MdListItemIcon>
                    <MdFormCheckboxSimple
                      name={'checkbox-' + data.entity.id}
                      edge='start'
                      checked={data.checked ?? false}
                      disableRipple
                      callbackClick={handleClickChecbox(data.entity.id, !data.checked, callbackCheckbox)}
                      disabled={disabled}
                    />
                  </MdListItemIcon>
                )}
                {data.icon && (
                  <MdListItemIcon>
                    <IconClickable icon={data.icon} color={getIconColor(data.checked)} disabled={true} />
                  </MdListItemIcon>
                )}
                <MdListItemText
                  color={getTextColor(data.checked) + ' ' + (data.checked ? 'checked' : 'not-checked')}
                  label={data.name}
                  secondary={<>{data.secondary}</>}
                />
                {data.chip && <MdChip className={chipClassName} label={data.chip} icon={icon} />}
                {buttonChildren && <>{buttonChildren(data.entity)}</>}
                {callbackSettings && (
                  <MdListItemIcon>
                    <IconClickable
                      icon={iconSettings}
                      color='primary'
                      callback={() => callbackSettings(data.entity)}
                      disabled={data.disabled}
                    />
                  </MdListItemIcon>
                )}
                {callbackDelete && data.entity.id && (
                  <MdListItemIcon>
                    <CustomModaleConfirm
                      id={data.entity.id}
                      icon='delete'
                      iconColor='error'
                      callback={callbackDelete}
                      disabled={data.disabled}
                    />
                  </MdListItemIcon>
                )}
              </MdListItem>
              <MdDivider variant={data.avatar ? 'inset' : 'fullWidth'} />
            </Fragment>
          ))
        )}
      </MdList>
    );
  },
);

export default CustomList;
