import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdCard, MdInputText, WindowUtils } from '@vagabond-inc/react-boilerplate-md';
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

const DEFAULT_VALUES = { username: '', password: '' };

const LoginPage: React.FC = () => {
  const { handleLogin, redirectIfLogged } = useAuth();

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  return (
    <AppContent className='max-width-800' seoTitle='SEO:LOGIN.TITLE' seoDescription='SEO:LOGIN.DESCRIPTION'>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <MdCard title='AUTH:LOGIN.TITLE'>
          <AppFormik
            initialValues={DEFAULT_VALUES}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
            {(props) => (
              <>
                <div className='flex-row-responsive gap10 align-center justify-center' style={{ marginBottom: '10px' }}>
                  <LoginGoogle />
                  <LoginFacebook />
                </div>
                <MdInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
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
