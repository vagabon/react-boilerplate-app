import { JSONObject, MdCard, MdInputText, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useApiService } from '../../../../api/hook/useApiService';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { useMessage } from '../../../../hook/message/useMessage';
import { IHeaderProp } from '../../../../template/Header';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import AuthService from '../../service/AuthService';
import { IRegisterDto, RegisterDto } from './dto/RegisterDto';
import REGISTER_SCHEMA from './schema/register.schema.json';

const DEFAULT_VALUES: JSONObject = new RegisterDto() as JSONObject;

export interface IRegisterPageProps extends IHeaderProp {
  googleCaptchaId: string;
}

const RegisterPage: React.FC<IRegisterPageProps> = memo(({ googleCaptchaId, ...rest }) => {
  const { Trans } = useAppTranslate();
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
      if (token) {
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
      <MdCard title='AUTH:REGISTER.TITLE'>
        {!isRegister && (
          <AppFormik
            initialValues={DEFAULT_VALUES}
            validationSchema={REGISTER_SCHEMA}
            onSubmit={handleRegister}
            backButton={false}>
            {(props) => (
              <>
                <MdInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
                <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD_CONFIRM' name='password2' type='password' {...props} />
                <div className='flex' style={{ marginTop: '15px', alignItems: 'flex-end' }}>
                  <ReCAPTCHA sitekey={googleCaptchaId} ref={captchaRef} />
                </div>
              </>
            )}
          </AppFormik>
        )}
        {isRegister && <Trans i18nKey='AUTH:REGISTER.SUCCESS' />}
        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
      </MdCard>
    </AppContent>
  );
});

export default RegisterPage;
