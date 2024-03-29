import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdCard, MdInputText } from '@vagabond-inc/react-boilerplate-md';
import { useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import LoginFacebook from './facebook/LoginFacebook';
import LoginGoogle from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const DEFAULT_VALUES = { username: '', password: '' };

export interface ILoginPageProps extends IBaseCustomSeoProps {
  googleClientId: string;
  facebookClientId: string;
}
export interface ILoginPageProps extends IBaseCustomSeoProps {}

const LoginPage: React.FC<ILoginPageProps> = ({ googleClientId, facebookClientId, ...rest }) => {
  const { handleLogin, redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  return (
    <AppContent {...rest} className='max-width-800' seoTitle='SEO:LOGIN.TITLE' seoDescription='SEO:LOGIN.DESCRIPTION'>
      <GoogleOAuthProvider clientId={googleClientId}>
        <MdCard title='AUTH:LOGIN.TITLE'>
          <AppFormik
            initialValues={DEFAULT_VALUES}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
            {(props) => (
              <>
                <div className='flex-row-responsive gap10 align-center justify-center' style={{ marginBottom: '10px' }}>
                  <LoginGoogle {...rest} />
                  <LoginFacebook {...rest} facebookClientId={facebookClientId} />
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
