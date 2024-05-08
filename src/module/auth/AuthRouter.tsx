import { Route, Routes } from 'react-router-dom';
import { IHeaderProp } from '../../template/Header';
import NotFoundPage from '../not-found/page/NotFoundPage';
import ActivationPage from './page/activation/ActivationPage';
import CheckIdentityPage from './page/check-identity/CheckIdentityPage';
import ForgetPasswordPage from './page/forget-password/ForgetPasswordPage';
import LoginPage, { ILoginPageProps } from './page/login/LoginPage';
import RegisterPage, { IRegisterPageProps } from './page/register/RegisterPage';

export interface IAuthRouterProps extends ILoginPageProps, IRegisterPageProps, IHeaderProp {}

const AuthRouter: React.FC<IAuthRouterProps> = ({ googleClientId, facebookClientId, googleCaptchaId, ...rest }) => {
  return (
    <Routes>
      <Route>
        <Route
          path='/signin'
          element={<LoginPage googleClientId={googleClientId} facebookClientId={facebookClientId} {...rest} />}
        />
        <Route
          path='/signup'
          element={
            <RegisterPage
              googleClientId={googleClientId}
              facebookClientId={facebookClientId}
              googleCaptchaId={googleCaptchaId}
              {...rest}
            />
          }
        />
        <Route path='/activation/:token' element={<ActivationPage {...rest} />} />
        <Route path='/forget/password' element={<ForgetPasswordPage {...rest} />} />
        <Route path='/check/identity' element={<CheckIdentityPage {...rest} />} />
        <Route path='*' element={<NotFoundPage {...rest} />}></Route>
      </Route>
    </Routes>
  );
};

export default AuthRouter;
