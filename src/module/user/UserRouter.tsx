import { ID } from '@vagabond-inc/react-boilerplate-md';
import { type i18n as i18nType } from 'i18next';
import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IBaseCustomSeoProps } from '../custom/seo/component/CustomSeo';
import NotFoundPage from '../not-found/page/NotFoundPage';
import ProfilePage from '../user/profile/page/ProfilePage';

interface IUserRouterProps extends IBaseCustomSeoProps {
  i18n: i18nType;
  profile: (id: ID) => JSX.Element;
  profileChildren?: (id?: ID) => JSX.Element;
}

const UserRouter: React.FC<IUserRouterProps> = memo(({ profile, profileChildren, ...rest }) => {
  return (
    <Routes>
      <Route>
        <Route
          path='/'
          element={
            <ProfilePage {...rest} apiUrl={rest.apiUrl} profileReact={profile} profileReactChildren={profileChildren} />
          }
        />
        <Route
          path='/:id'
          element={
            <ProfilePage {...rest} apiUrl={rest.apiUrl} profileReact={profile} profileReactChildren={profileChildren} />
          }
        />
        <Route path='*' element={<NotFoundPage {...rest} />}></Route>
      </Route>
    </Routes>
  );
});

export default UserRouter;
