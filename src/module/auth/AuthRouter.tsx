import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SuspenceLoader } from '../../suspence/SuspenceLoader';
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
          element={SuspenceLoader(
            <LoginPage googleClientId={googleClientId} facebookClientId={facebookClientId} {...rest} />,
          )}
        />
        <Route
          path='/signup'
          element={SuspenceLoader(
            <RegisterPage
              googleClientId={googleClientId}
              facebookClientId={facebookClientId}
              googleCaptchaId={googleCaptchaId}
              {...rest}
            />,
          )}
        />
        <Route path='/activation/:token' element={SuspenceLoader(<ActivationPage {...rest} />)} />
        <Route path='/forget/password' element={SuspenceLoader(<ForgetPasswordPage {...rest} />)} />
        <Route path='/check/identity' element={SuspenceLoader(<CheckIdentityPage {...rest} />)} />
        <Route path='*' element={SuspenceLoader(<NotFoundPage {...rest} />)}></Route>
      </Route>
    </Routes>
  );
};
