import { useCallback, useEffect, useState } from 'react';

import { IRegisterDto, RegisterDto } from './dto/RegisterDto';

import { JSONObject, MdCard, MdInputText, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import AuthService from '../../service/AuthService';
import REGISTER_SCHEMA from './schema/register.schema.json';

const DEFAULT_VALUES: JSONObject = new RegisterDto() as JSONObject;

const RegisterPage: React.FC = () => {
  const { Trans } = useAppTranslate();
  const { redirectIfLogged } = useAuth();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  const handleLogin = useCallback((data: IRegisterDto) => {
    if (data.username && data.email && data.password) {
      AuthService.register(data.username, data.email, data.password).then(() => {
        setIsRegister(true);
      });
    }
  }, []);

  return (
    <AppContent>
      <MdCard title='AUTH:REGISTER.TITLE'>
        {!isRegister && (
          <AppFormik
            initialValues={DEFAULT_VALUES}
            validationSchema={REGISTER_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
            {(props) => (
              <>
                <MdInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
                <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD_CONFIRM' name='password2' type='password' {...props} />
              </>
            )}
          </AppFormik>
        )}
        {isRegister && <Trans i18nKey='AUTH:REGISTER.SUCCESS' />}
        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
      </MdCard>
    </AppContent>
  );
};

export default RegisterPage;
