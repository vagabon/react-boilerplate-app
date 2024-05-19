import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IHeaderDto } from '../../template/dto/HeaderDto';
import { NotFoundPage } from '../not-found/page/NotFoundPage';
import { ProfilePage } from '../user/profile/page/ProfilePage';

interface IUserRouterProps extends IHeaderDto {
  profile: (id: ID) => React.JSX.Element;
  profileChildren?: (id?: ID) => React.JSX.Element;
}

export const UserRouter: React.FC<IUserRouterProps> = memo(({ profile, profileChildren, ...rest }) => {
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
