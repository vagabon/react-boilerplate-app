import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdCard, MdFormCheckbox, MdInputText, WindowUtils } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import LoginFacebook from './facebook/LoginFacebook';
import LoginGoogle from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const GOOGLE_CLIENT_ID: string = WindowUtils.getEnv('GOOGLE_CLIENT_ID');

const DEFAULT_VALUES = { username: '', password: '', rememberMe: false };

const LoginPage: React.FC = () => {
  const { handleLogin, redirectIfLogged } = useAuth();

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  return (
    <AppContent className='max-width-800'>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <MdCard title='AUTH:LOGIN.TITLE'>
          <AppFormik
            initialValues={DEFAULT_VALUES}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
            {(props) => (
              <>
                <MdInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
                <MdFormCheckbox label='AUTH:FIELDS.REMEMBER_ME' name='rememberMe' {...props} />
                <LoginGoogle />
                <LoginFacebook />
              </>
            )}
          </AppFormik>

          <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNUP} />
        </MdCard>
      </GoogleOAuthProvider>
    </AppContent>
  );
};

export default LoginPage;
