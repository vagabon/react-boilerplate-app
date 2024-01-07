import { ID } from '@vagabond-inc/react-boilerplate-md';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from '../user/profile/page/ProfilePage';

interface IUserRouterProps {
  profile: (id: ID) => React.JSX.Element;
}

const UserRouter: React.FC<IUserRouterProps> = ({ profile }) => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<ProfilePage profileReact={profile} />} />
        <Route path='/:id' element={<ProfilePage profileReact={profile} />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
