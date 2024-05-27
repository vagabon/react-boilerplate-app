import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppSuspenceLoader } from '../../app/suspence/component/AppSuspenceLoader';
import { IHeaderDto } from '../../template/dto/HeaderDto';

const LoginPage = lazy(() => import('./page/login/LoginPage').then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() =>
  import('./page/register/RegisterPage').then((module) => ({ default: module.RegisterPage })),
);
const ForgetPasswordPage = lazy(() =>
  import('./page/forget-password/ForgetPasswordPage').then((module) => ({ default: module.ForgetPasswordPage })),
);
const CheckIdentityPage = lazy(() =>
  import('./page/check-identity/CheckIdentityPage').then((module) => ({ default: module.CheckIdentityPage })),
);
const ActivationPage = lazy(() =>
  import('./page/activation/ActivationPage').then((module) => ({ default: module.ActivationPage })),
);
const NotFoundPage = lazy(() =>
  import('../not-found/page/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

export interface IAuthRouterProps extends IHeaderDto {
  googleClientId: string;
  facebookClientId: string;
  googleCaptchaId: string;
}

export const AuthRouter: React.FC<IAuthRouterProps> = ({
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
          element={AppSuspenceLoader(
            <LoginPage googleClientId={googleClientId} facebookClientId={facebookClientId} {...rest} />,
          )}
        />
        <Route
          path='/signup'
          element={AppSuspenceLoader(
            <RegisterPage
              googleClientId={googleClientId}
              facebookClientId={facebookClientId}
              googleCaptchaId={googleCaptchaId}
              {...rest}
            />,
          )}
        />
        <Route path='/activation/:token' element={AppSuspenceLoader(<ActivationPage {...rest} />)} />
        <Route path='/forget/password' element={AppSuspenceLoader(<ForgetPasswordPage {...rest} />)} />
        <Route path='/check/identity' element={AppSuspenceLoader(<CheckIdentityPage {...rest} />)} />
        <Route path='*' element={AppSuspenceLoader(<NotFoundPage {...rest} />)}></Route>
      </Route>
    </Routes>
  );
};
