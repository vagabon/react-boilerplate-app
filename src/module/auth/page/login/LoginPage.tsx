import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdCard, MdFormCheckbox, MdInputText } from '@vagabond-inc/react-boilerplate-md';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import LoginFacebook from './facebook/LoginFacebook';
import LoginGoogle from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const GOOGLE_CLIENT_ID: string = window['ENV' as keyof Window]['GOOGLE_CLIENT_ID' as keyof Window]?.toString();

const DEFAULT_VALUES = { email: '', password: '' };

const LoginPage: React.FC = () => {
  const { handleLogin } = useAuth();

  return (
    <AppContent>
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
