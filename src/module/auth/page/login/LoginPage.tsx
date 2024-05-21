import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdInputText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
import { memo, useEffect } from 'react';
import { AppContent } from '../../../../app/content/component/AppContent';
import { AppForm } from '../../../../app/form/component/AppForm';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { AuthFooter } from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import { LoginFacebook } from './facebook/LoginFacebook';
import { LoginGoogle } from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const DEFAULT_VALUES = { username: '', password: '' };

export interface ILoginPageProps {
  googleClientId: string;
  facebookClientId: string;
}
export interface ILoginPageProps extends IHeaderDto {}

export const LoginPage: React.FC<ILoginPageProps> = memo(({ googleClientId, facebookClientId, ...rest }) => {
  const { handleLogin, redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  return (
    <AppContent {...rest} className='max-width-800' seo='SEO:LOGIN'>
      <MdCard icon='exit' title='AUTH:LOGIN.TITLE'>
        <AppForm
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
        </AppForm>

        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNUP} />
      </MdCard>
    </AppContent>
  );
});
