import { GoogleOAuthProvider } from '@react-oauth/google';
import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdFormSwitch } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/switch/MdFormSwitch';
import { MdInputText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { IThemeContextDto, useThemeContent } from '@vagabond-inc/react-boilerplate-md/dist/theme/context/ThemeContext';
import { ObjectUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/object/ObjectUtils';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useApiService } from '../../../../api/hook/useApiService';
import { AppContent } from '../../../../app/content/component/AppContent';
import { AppForm } from '../../../../app/form/component/AppForm';
import { useMessage } from '../../../../hook/message/useMessage';
import { AuthFooter } from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import { AuthService } from '../../service/AuthService';
import { ILoginPageProps } from '../login/LoginPage';
import { LoginFacebook } from '../login/facebook/LoginFacebook';
import { LoginGoogle } from '../login/google/LoginGoogle';
import { IRegisterDto, RegisterDto } from './dto/RegisterDto';
import REGISTER_SCHEMA from './schema/register.schema.json';

const DEFAULT_VALUES: JSONObject = new RegisterDto() as JSONObject;

export interface IRegisterPageProps extends ILoginPageProps {
  googleCaptchaId: string;
}

export const RegisterPage: React.FC<IRegisterPageProps> = memo(
  ({ googleClientId, facebookClientId, googleCaptchaId, ...rest }) => {
    const { mode } = useThemeContent() as IThemeContextDto;
    const { redirectIfLogged } = useAuth(rest.apiUrl);
    const { httpPost } = useApiService(rest.apiUrl);
    const { setMessage } = useMessage();
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const captchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
      redirectIfLogged();
    }, [redirectIfLogged]);

    const handleRegister = useCallback(
      (data: IRegisterDto) => {
        const token = (captchaRef.current as unknown as { getValue: () => string })?.getValue();
        if (!data.accept) {
          setMessage('ERRORS:ACCEPT_TERMS', 'error');
        } else if (token) {
          data.username &&
            data.email &&
            data.password &&
            httpPost('/auth/captcha', { token }, () => {
              captchaRef.current?.reset();
              AuthService.register(rest.apiUrl, data.username, data.email, data.password).then(() => {
                setIsRegister(true);
              });
            });
        } else {
          setMessage('ERRORS:CAPTCHA_INVALID', 'error');
        }
      },
      [rest.apiUrl, httpPost, setMessage],
    );

    return (
      <AppContent {...rest} seo='SEO:REGISTER'>
        <MdCard icon='account' title='AUTH:REGISTER.TITLE'>
          {!isRegister && (
            <AppForm
              initialValues={DEFAULT_VALUES}
              validationSchema={REGISTER_SCHEMA}
              onSubmit={handleRegister}
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
                  <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...formikProps} />
                  <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...formikProps} />
                  <MdInputText label='AUTH:FIELDS.PASSWORD_CONFIRM' name='password2' type='password' {...formikProps} />
                  <MdFormSwitch label='AUTH:FIELDS.ACCEPT_TERMS' name='accept' {...formikProps} />
                  <div className='flex' style={{ marginTop: '15px', alignItems: 'flex-end' }}>
                    <ReCAPTCHA sitekey={googleCaptchaId} ref={captchaRef} theme={mode === 'dark' ? 'dark' : 'light'} />
                  </div>
                </>
              )}
            </AppForm>
          )}
          {isRegister && <MdTypo content='AUTH:REGISTER.SUCCESS' />}
          <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
        </MdCard>
      </AppContent>
    );
  },
);
