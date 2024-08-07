import { MdFab } from '@vagabond-inc/react-boilerplate-md/dist/md/component/fab/MdFab';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { memo, useCallback } from 'react';
import { useProfile } from '../../../../../module/user/profile/hook/useProfile';
import { ProfileUtils } from '../../../../../module/user/profile/utils/ProfileUtils';

export interface IAppFabAddProps {
  color?: 'success' | 'error' | 'info' | 'warning';
  urlAdd?: string;
  urlAddRole?: string[];
  callback?: () => void;
}

export const AppFabAdd: React.FC<IAppFabAddProps> = memo(({ ...rest }) => {
  const { userConnected } = useProfile();
  const { navigate } = useAppRouter();

  const doCreate = useCallback(
    (callback?: () => void) => () => {
      rest.urlAdd && navigate?.(rest.urlAdd);
      callback?.();
    },
    [rest.urlAdd, navigate],
  );

  return (
    <div className='relative'>
      {rest.urlAddRole && ProfileUtils.hasProfile(userConnected, rest.urlAddRole) && (
        <div className='button-fab'>
          <MdFab size='medium' color='secondary' callback={doCreate(rest.callback)}></MdFab>
        </div>
      )}
    </div>
  );
});
