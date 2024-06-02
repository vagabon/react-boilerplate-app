import { IApiDto, ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { MdAvatar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/avatar/MdAvatar';
import { MdChip } from '@vagabond-inc/react-boilerplate-md/dist/md/component/chip/MdChip';
import { MdDivider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/divider/MdDivider';
import { MdFormCheckboxSimple } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/checkbox/MdFormCheckboxSimple';
import { MdList } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdList';
import { MdListItem } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItem';
import { MdListItemAvatar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemAvatar';
import { MdListItemIcon } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemIcon';
import { MdListItemText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/list/MdListItemText';
import React, { Fragment, memo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppImage } from '../../../../app/image/hook/useAppImage';
import { useAppSelector } from '../../../../store/Store';
import { CustomModaleConfirm } from '../../modale/component/CustomModaleConfirm';
import { useCustomList } from '../hook/useCustomList';

export interface ICustomListDto {
  avatar?: string;
  user?: IApiDto;
  icon?: string;
  chip?: string | number;
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
  buttonChildren?: (data: IApiDto) => React.JSX.Element;
  callback?: (data: IApiDto) => void;
  isCheckboxColor?: boolean;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  labelDelete?: string;
  callbackDelete?: (id: ID) => void;
  iconSettings?: string;
  callbackSettings?: (data: IApiDto) => void;
}

export const CustomList: React.FC<ICustomListProps> = memo(
  ({
    apiUrl,
    className = '',
    datas,
    icon,
    chipClassName,
    buttonChildren,
    callback,
    isCheckboxColor,
    callbackCheckbox,
    labelDelete,
    callbackDelete,
    iconSettings,
    callbackSettings,
  }) => {
    const message = useAppSelector((state) => state.common.message, shallowEqual);
    const { disabled, handleClick, handleClickChecbox, getIconColor, getTextColor } = useCustomList(
      message,
      callback,
      callbackCheckbox,
      isCheckboxColor,
    );
    const { getImage } = useAppImage(apiUrl);

    return (
      <MdList className={'custom-list overflow overflow-x-none ' + className}>
        {!datas || datas.length === 0 ? (
          <MdListItem className='no-animate' component='div' disablePadding>
            <MdListItem className='no-animate'>
              <MdListItemText className='flex align-center' primary={'NO_RESULT'} />
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
                    <MdAvatar name={data.avatar} image={getImage(data.avatar)} />
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
                  className={getTextColor(data.checked) + ' ' + (data.checked ? 'checked' : 'not-checked')}
                  primary={data.name}
                  secondary={data.secondary}
                />
                {(data.chip || data.chip === 0) && (
                  <MdChip className={chipClassName} label={String(data.chip)} icon={icon} />
                )}
                {buttonChildren && <>{buttonChildren(data.entity)}</>}
                {callbackSettings && (
                  <MdListItemIcon>
                    <IconClickable
                      icon={iconSettings ?? 'settings'}
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
                      label={labelDelete}
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
