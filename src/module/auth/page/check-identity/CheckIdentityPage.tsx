import { MdCard, MdInputText, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import AppFormik from '../../../../app/formik/AppFormik';
import { IBaseCustomSeoProps } from '../../../custom/seo/component/CustomSeo';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import { useAuth } from '../../hook/useAuth';
import AuthService from '../../service/AuthService';
import { ICheckIdentityDto } from './dto/CheckIdentityDto';
import CHECK_IDENTITY_SCHEMA from './schema/check.identity.schema.json';

const DEFAULT_VALUES = { token: '' };

export interface ICheckIdentityPageProps extends IBaseCustomSeoProps {}

const CheckIdentityPage: React.FC<ICheckIdentityPageProps> = ({ ...rest }) => {
  const { Trans } = useAppTranslate();
  const [state, setState] = useState<boolean>(false);
  const { redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  const handleCheckIdentity = useCallback(
    (data: ICheckIdentityDto) => {
      AuthService.checkIdentityToken(rest.apiUrl, data.token as string).then((data: ICheckIdentityDto) => {
        if (data.token !== '') {
          AuthService.resetPassword(rest.apiUrl, data.token as string).then((data) => {
            if (data) {
              setState(true);
            }
          });
        }
      });
    },
    [rest.apiUrl],
  );

  return (
    <AppContent {...rest} seoTitle='SEO:IDENTITY.TITLE' seoDescription='SEO:IDENTITY.DESCRIPTION'>
      <MdCard title='AUTH:CHECK_IDENTITY.TITLE'>
        {state === false && (
          <AppFormik
            initialValues={DEFAULT_VALUES}
            validationSchema={CHECK_IDENTITY_SCHEMA}
            onSubmit={handleCheckIdentity}
            backButton={false}>
            {(props) => <MdInputText label='AUTH:FIELDS.CODE' name='token' {...props} />}
          </AppFormik>
        )}
        {state === true && (
          <div>
            <Trans i18nKey='AUTH:CHECK_IDENTITY.SUCCESS' />
            <p>&nbsp;</p>
          </div>
        )}

        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
      </MdCard>
    </AppContent>
  );
};

export default CheckIdentityPage;
