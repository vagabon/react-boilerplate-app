import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdCard, MdInputText, ObjectUtils } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { IHeaderProp } from '../../../../template/Header';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import LoginFacebook from './facebook/LoginFacebook';
import LoginGoogle from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const DEFAULT_VALUES = { username: '', password: '' };

export interface ILoginPageProps {
  googleClientId: string;
  facebookClientId: string;
}
export interface ILoginPageProps extends IHeaderProp {}

const LoginPage: React.FC<ILoginPageProps> = memo(({ googleClientId, facebookClientId, ...rest }) => {
  const { handleLogin, redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  return (
    <AppContent {...rest} className='max-width-800' seo='SEO:LOGIN'>
      <MdCard icon='exit' title='AUTH:LOGIN.TITLE'>
        <AppFormik
          initialValues={DEFAULT_VALUES}
          validationSchema={LOGIN_SCHEMA}
          onSubmit={handleLogin}
          backButton={false}>
          {(formikProps) => (
            <>
              <div
                className='flex-row-responsive gap10 align-center justify-center divider-margin'
                style={{ marginBottom: '10px' }}>
                <GoogleOAuthProvider clientId={googleClientId}>
                  <LoginGoogle {...rest} />
                </GoogleOAuthProvider>
                <LoginFacebook {...rest} facebookClientId={facebookClientId} />
              </div>
              <MdInputText
                label='AUTH:FIELDS.LOGIN'
                name='username'
                {...formikProps}
                changeValue={ObjectUtils.toLowerCase}
                isFocus={true}
              />
              <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...formikProps} />
            </>
          )}
        </AppFormik>

        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNUP} />
      </MdCard>
    </AppContent>
  );
});

export default LoginPage;
