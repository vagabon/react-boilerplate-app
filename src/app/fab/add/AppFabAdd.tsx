import { MdFab, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback } from 'react';
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

const AppFabAdd: React.FC<IAppFabAddProps> = memo(({ ...rest }) => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);
  const { navigate } = useAppRouter();

  const doCreate = useCallback(
    (callback?: () => void) => () => {
      rest.urlAdd && navigate(rest.urlAdd);
      callback?.();
    },
    [rest.urlAdd, navigate],
  );

  return (
    <div className='max-width relative'>
      {rest.urlAddRole && RoleUtils.hasProfile(currentUser, rest.urlAddRole) && (
        <div style={{ position: 'absolute', bottom: '1px', right: '1px' }}>
          <MdFab size='medium' color='primary' callback={doCreate(rest.callback)}></MdFab>
        </div>
      )}
    </div>
  );
});

export default AppFabAdd;
