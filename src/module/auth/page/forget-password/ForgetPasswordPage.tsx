import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdInputText } from '@vagabond-inc/react-boilerplate-md/dist/md/component/form/text/MdInputText';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { ReactNode, memo, useCallback, useEffect } from 'react';
import { AppContent } from '../../../../app/content/component/AppContent';
import { AppForm } from '../../../../app/form/component/AppForm';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { IUserDto } from '../../../user/user/dto/UserDto';
import { AuthFooter } from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import { AuthService } from '../../service/AuthService';
import FORGET_PASSWORD_SCHEMA from './schema/forget.password.schema.json';

const DEFAULT_VALUES = { email: '' };

export interface IForgetPasswordPageProps extends IHeaderDto {
  footer: ReactNode;
}

export const ForgetPasswordPage: React.FC<IForgetPasswordPageProps> = memo(({ footer, ...rest }) => {
  const { navigate } = useAppRouter();
  const { redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  const handleForgetPassword = useCallback(
    (data: IUserDto) => {
      AuthService.createIdentityToken(rest.apiUrl, data.email as string).then(() => {
        navigate?.('/auth/check/identity');
      });
    },
    [rest.apiUrl, navigate],
  );

  return (
    <AppContent {...rest} seo='SEO:FORGET_PASSWORD'>
      <MdCard icon='password' title='AUTH:FORGET_PASSWORD.TITLE'>
        <AppForm
          initialValues={DEFAULT_VALUES}
          validationSchema={FORGET_PASSWORD_SCHEMA}
          onSubmit={handleForgetPassword}
          backButton={false}>
          {(formikProps) => <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...formikProps} />}
        </AppForm>

        <AuthFooter left={AuthFooterEnum.SIGNIN} rigth={AuthFooterEnum.SIGNUP} />
      </MdCard>
      {footer}
    </AppContent>
  );
});
