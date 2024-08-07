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
import clsx from 'clsx';
import React, { Fragment, memo } from 'react';
import { useAppImage } from '../../../../app/image/hook/useAppImage';
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
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  labelDelete?: string;
  callbackDelete?: (id: ID) => void;
  iconSettings?: string;
  iconColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default';
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
    callbackCheckbox,
    labelDelete,
    callbackDelete,
    iconSettings,
    iconColor,
    callbackSettings,
  }) => {
    const { handleClick, handleClickChecbox } = useCustomList(callback);
    const { getImage } = useAppImage(apiUrl);

    return (
      <MdList className={'custom-list overflow overflow-x-none ' + className}>
        {!datas || datas.length === 0 ? (
          <MdListItem className='no-animate' component='div' disablePadding>
            <MdListItem className='no-animate'>
              <MdListItemText className='flex align-center' content={'NO_RESULT'} />
            </MdListItem>
          </MdListItem>
        ) : (
          datas?.map((data) => (
            <Fragment key={'custom-list-' + data.name + data.entity.id}>
              <MdListItem component='div' disablePadding>
                {data.avatar && (
                  <MdListItemAvatar>
                    <MdAvatar name={data.avatar} image={getImage(data.avatar)} />
                  </MdListItemAvatar>
                )}
                {callbackCheckbox && (
                  <MdListItemIcon>
                    <MdFormCheckboxSimple
                      color='default'
                      name={'checkbox-' + data.entity.id}
                      edge='start'
                      checked={data.checked ?? false}
                      disableRipple
                      callbackClick={handleClickChecbox(data.entity.id, !data.checked, callbackCheckbox)}
                    />
                  </MdListItemIcon>
                )}
                {data.icon && (
                  <MdListItemIcon className={clsx(data.checked && 'text-grey', !data.checked && 'text-black')}>
                    <IconClickable icon={data.icon} color={'inherit'} disabled={true} />
                  </MdListItemIcon>
                )}
                <MdListItemText
                  className={clsx(data.checked ? 'checked' : 'not-checked', 'pointer')}
                  content={data.name}
                  secondary={data.secondary}
                  onClick={handleClick(data.entity)}
                />
                {(data.chip || data.chip === 0) && (
                  <MdChip className={chipClassName} label={String(data.chip)} icon={icon} />
                )}
                {buttonChildren && <>{buttonChildren(data.entity)}</>}
                {callbackSettings && (
                  <MdListItemIcon>
                    <IconClickable
                      icon={iconSettings ?? 'settings'}
                      color={iconColor ?? 'secondary'}
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
