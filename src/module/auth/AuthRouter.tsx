import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../not-found/page/NotFoundPage';
import ActivationPage from './page/activation/ActivationPage';
import CheckIdentityPage from './page/check-identity/CheckIdentityPage';
import ForgetPasswordPage from './page/forget-password/ForgetPasswordPage';
import LoginPage from './page/login/LoginPage';
import RegisterPage from './page/register/RegisterPage';

const AuthRouter: React.FC = () => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Navigate to='/auth/signin' />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/activation/:token' element={<ActivationPage />} />
        <Route path='/forget/password' element={<ForgetPasswordPage />} />
        <Route path='/check/identity' element={<CheckIdentityPage />} />
        <Route path='*' element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

export default AuthRouter;
