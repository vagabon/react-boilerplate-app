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
  MdListItemButton,
  MdListItemIcon,
  MdListItemText,
  useAppTranslate,
} from '@vagabond-inc/react-boilerplate-md';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useMessage } from '../../../../hook/message/useMessage';
import CustomModaleConfirm from '../../modale/component/CustomModaleConfirm';

export interface ICustomListDto extends IApiDto {
  avatar?: string;
  user?: IApiDto;
  icon?: string;
  chip?: string;
  secondary?: string;
  name: string;
  checked?: boolean;
}

export interface ICustomListProps {
  className?: string;
  datas: ICustomListDto[];
  buttonChildren?: (id: ID) => React.JSX.Element;
  callback?: (data: IApiDto) => void;
  callbackAvatar?: (data: IApiDto) => () => void;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  callbackDelete?: (id: ID) => void;
  callbackSettings?: (data: IApiDto) => void;
}

const CustomList: React.FC<ICustomListProps> = ({
  className,
  datas,
  buttonChildren,
  callback,
  callbackAvatar,
  callbackCheckbox,
  callbackDelete,
  callbackSettings,
}) => {
  const { t } = useAppTranslate();
  const [disabled, setDisabled] = useState<boolean>();
  const { message } = useMessage();

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

  const getTextColor = useCallback((checked?: boolean) => {
    return checked ? 'success' : '';
  }, []);

  return (
    <MdList className={'custom-list overflow overflow-x-none ' + className}>
      {!datas || datas.length === 0 ? (
        <MdListItem component='div' disablePadding>
          <MdListItemButton>
            <MdListItemText color='flex align-center' label={t('NO_RESULT')} />
          </MdListItemButton>
        </MdListItem>
      ) : (
        datas?.map((data) => (
          <Fragment key={data.id}>
            <MdListItem component='div' disablePadding callback={handleClick(data)}>
              {data.avatar && (
                <MdListItemAvatar>
                  <MdAvatar name={data.avatar} image={data.avatar} callback={callbackAvatar?.(data.user as IApiDto)} />
                </MdListItemAvatar>
              )}
              {data.icon && (
                <MdListItemIcon>
                  <IconClickable icon={data.icon} color={getIconColor(data.checked)} disabled={true} />
                </MdListItemIcon>
              )}
              {callbackCheckbox && (
                <MdListItemIcon>
                  <MdFormCheckboxSimple
                    name={'checkbox-' + data.id}
                    edge='start'
                    checked={data.checked ?? false}
                    disableRipple
                    callbackClick={handleClickChecbox(data.id, !data.checked, callbackCheckbox)}
                    disabled={disabled}
                  />
                </MdListItemIcon>
              )}
              <MdListItemText color={getTextColor(data.checked)} label={data.name} secondary={<>{data.secondary}</>} />
              {data.chip && <MdChip label={data.chip} />}
              {buttonChildren && <>{buttonChildren(data.id)}</>}
              {callbackSettings && (
                <MdListItemIcon>
                  <IconClickable icon='settings' color='primary' callback={() => callbackSettings(data)} />
                </MdListItemIcon>
              )}
              {callbackDelete && data.id && (
                <MdListItemIcon>
                  <CustomModaleConfirm id={data.id} icon='delete' iconColor='error' callback={callbackDelete} />
                </MdListItemIcon>
              )}
            </MdListItem>
            <MdDivider variant={data.avatar ? 'inset' : 'fullWidth'} component='li' />
          </Fragment>
        ))
      )}
    </MdList>
  );
};

export default CustomList;
