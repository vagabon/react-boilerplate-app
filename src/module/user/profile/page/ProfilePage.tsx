import { ID, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import { useAppSelector } from '../../../../store/Store';
import { useUser } from '../../user/hook/useUser';
import ProfileShow from '../component/ProfileShow';

interface IProfilePageProps {
  profileReact: (id: ID) => React.JSX.Element;
}

const ProfilePage: React.FC<IProfilePageProps> = ({ profileReact }) => {
  const {
    navigate,
    params: { id = -1 },
  } = useAppRouter();
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { user, fetchById } = useUser();

  useEffect(() => {
    if (id !== -1) {
      fetchById(id);
    }
  }, [fetchById, id, currentUser]);

  if (!currentUser) {
    navigate('/auth/signin');
    return <></>;
  }

  return <ProfileShow user={id !== -1 ? user : currentUser.user} profileReact={profileReact} />;
};

export default ProfilePage;
