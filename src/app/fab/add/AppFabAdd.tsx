import { MdFab, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { ICurrentUserDto } from '../../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../../module/user/user/dto/UserDto';
import { useAppSelector } from '../../../store/Store';
import RoleUtils from '../../../utils/role/RoleUtils';

export interface IAppFabAddProps {
  color?: 'success' | 'error' | 'info' | 'warning';
  urlAdd?: string;
  urlAddRole?: string[];
  callback?: () => void;
}

const AppFabAdd: React.FC<IAppFabAddProps> = (props) => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);
  const { navigate } = useAppRouter();

  const doCreate = useCallback(
    (callback?: () => void) => () => {
      props.urlAdd && navigate(props.urlAdd);
      callback?.();
    },
    [props.urlAdd, navigate],
  );

  return (
    <div className='max-width relative'>
      {props.urlAddRole && RoleUtils.hasProfile(currentUser, props.urlAddRole) && (
        <div style={{ position: 'absolute', bottom: '-5px', right: '1px' }}>
          <MdFab size='medium' color='primary' callback={doCreate(props.callback)}></MdFab>
        </div>
      )}
    </div>
  );
};

export default AppFabAdd;
