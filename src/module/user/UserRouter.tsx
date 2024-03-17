import { ID } from '@vagabond-inc/react-boilerplate-md';
import { Route, Routes } from 'react-router-dom';
import { IBaseCustomSeoProps } from '../custom/seo/component/CustomSeo';
import NotFoundPage from '../not-found/page/NotFoundPage';
import ProfilePage from '../user/profile/page/ProfilePage';

interface IUserRouterProps extends IBaseCustomSeoProps {
  profile: (id: ID) => React.JSX.Element;
}

const UserRouter: React.FC<IUserRouterProps> = ({ profile, ...rest }) => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<ProfilePage {...rest} apiUrl={rest.apiUrl} profileReact={profile} />} />
        <Route path='/:id' element={<ProfilePage {...rest} apiUrl={rest.apiUrl} profileReact={profile} />} />
        <Route path='*' element={<NotFoundPage {...rest} />}></Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;
