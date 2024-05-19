import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { memo, useEffect } from 'react';
import { AppContent } from '../../../../app/content/AppContent';
import { useAppSelector } from '../../../../store/Store';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { useUser } from '../../user/hook/useUser';
import { ProfileShow } from '../component/ProfileShow';

export interface IProfilePageProps extends IHeaderDto {
  profileReact: (id: ID) => React.JSX.Element;
  profileReactChildren?: (id: ID) => React.JSX.Element;
}

export const ProfilePage: React.FC<IProfilePageProps> = memo(({ ...rest }) => {
  const {
    navigate,
    params: { id = -1 },
  } = useAppRouter();
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { user, fetchById } = useUser(rest.apiUrl);

  useEffect(() => {
    if (id !== -1) {
      fetchById(id);
    }
  }, [fetchById, id, currentUser]);

  if (!currentUser) {
    navigate('/auth/signin');
    return <></>;
  }

  return (
    <AppContent {...rest} className='flex1 profil-content' seo='SEO:PROFIL'>
      <ProfileShow {...rest} user={id !== -1 ? user : currentUser.user} />
    </AppContent>
  );
});
