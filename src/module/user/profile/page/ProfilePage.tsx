import { ID, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import { memo, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import { useAppSelector } from '../../../../store/Store';
import { IHeaderProp } from '../../../../template/Header';
import { useUser } from '../../user/hook/useUser';
import ProfileShow from '../component/ProfileShow';

export interface IProfilePageProps extends IHeaderProp {
  i18n: i18nType;
  profileReact: (id: ID) => React.JSX.Element;
  profileReactChildren?: (id: ID) => React.JSX.Element;
}

const ProfilePage: React.FC<IProfilePageProps> = memo(({ i18n, ...rest }) => {
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
      <ProfileShow {...rest} i18n={i18n} user={id !== -1 ? user : currentUser.user} />
    </AppContent>
  );
});

export default ProfilePage;
