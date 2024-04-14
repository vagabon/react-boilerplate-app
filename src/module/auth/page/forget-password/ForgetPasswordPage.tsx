import { IUserDto } from '../../../user/user/dto/UserDto';
import AuthService from '../../service/AuthService';

import { MdCard, MdInputText, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import FORGET_PASSWORD_SCHEMA from './schema/forget.password.schema.json';

const DEFAULT_VALUES = { email: '' };

export interface IForgetPasswordPageProps extends IBaseCustomSeoProps {}

const ForgetPasswordPage: React.FC<IForgetPasswordPageProps> = memo(({ ...rest }) => {
  const { navigate } = useAppRouter();
  const { redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  const handleForgetPassword = useCallback(
    (data: IUserDto) => {
      AuthService.createIdentityToken(rest.apiUrl, data.email as string).then(() => {
        navigate('/auth/check/identity');
      });
    },
    [rest.apiUrl, navigate],
  );

  return (
    <AppContent {...rest} seoTitle='SEO:FORGET_PASSWORD.TITLE' seoDescription='SEO:FORGET_PASSWORD.DESCRIPTION'>
      <MdCard title='AUTH:FORGET_PASSWORD.TITLE'>
        <AppFormik
          initialValues={DEFAULT_VALUES}
          validationSchema={FORGET_PASSWORD_SCHEMA}
          onSubmit={handleForgetPassword}
          backButton={false}>
          {(props) => <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />}
        </AppFormik>

        <AuthFooter left={AuthFooterEnum.SIGNIN} rigth={AuthFooterEnum.SIGNUP} />
      </MdCard>
    </AppContent>
  );
});

export default ForgetPasswordPage;
