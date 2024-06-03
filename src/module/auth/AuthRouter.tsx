import { Route, Routes } from 'react-router-dom';
import { IHeaderDto } from '../../template/dto/HeaderDto';
import { NotFoundPage } from '../not-found/page/NotFoundPage';
import { ActivationPage } from './page/activation/ActivationPage';
import { CheckIdentityPage } from './page/check-identity/CheckIdentityPage';
import { ForgetPasswordPage } from './page/forget-password/ForgetPasswordPage';
import { LoginPage } from './page/login/LoginPage';
import { RegisterPage } from './page/register/RegisterPage';

export interface IAuthRouterProps extends IHeaderDto {
  urlRedirectLogin: string;
  googleClientId: string;
  facebookClientId: string;
  googleCaptchaId: string;
}

export const AuthRouter: React.FC<IAuthRouterProps> = ({
  urlRedirectLogin,
  googleClientId,
  facebookClientId,
  googleCaptchaId,
  ...rest
}) => {
  return (
    <Routes>
      <Route>
        <Route
          path='/signin'
          element={
            <LoginPage
              urlRedirectLogin={urlRedirectLogin}
              googleClientId={googleClientId}
              facebookClientId={facebookClientId}
              {...rest}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <RegisterPage
              urlRedirectLogin={urlRedirectLogin}
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
