import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { useAppTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useAppTranslate';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../../../app/content/AppContent';
import { useAppSelector } from '../../../../store/Store';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { useAuth } from '../../hook/useAuth';
import { AuthService } from '../../service/AuthService';

export interface IActivationPageProps extends IHeaderDto {}

export const ActivationPage: React.FC<IActivationPageProps> = memo(({ ...rest }) => {
  const { Trans } = useAppTranslate();
  const params = useParams();
  const [isActivated, setIsActivated] = useState<boolean | undefined>(undefined);

  const { message } = useAppSelector((state) => state.common);
  const { redirectIfLogged } = useAuth(rest.apiUrl);

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  useEffect(() => {
    if (params.token) {
      AuthService.activation(rest.apiUrl, params.token).then(() => {
        setIsActivated(true);
      });
    }
  }, [rest.apiUrl, params.token]);

  useEffect(() => {
    if (message !== '') {
      setIsActivated(false);
    } else {
      setIsActivated(undefined);
    }
  }, [message]);

  return (
    <AppContent {...rest} seo='SEO:ACTIVATION'>
      <MdCard icon='account' title='AUTH:ACTIVATION.TITLE'>
        {isActivated === undefined && <Trans i18nKey='AUTH:ACTIVATION.CURRENT' />}
        {isActivated === false && <Trans i18nKey='AUTH:ACTIVATION.FAIL' />}
        {isActivated === true && (
          <>
            <Trans i18nKey='AUTH:ACTIVATION.ACTIVATED' />
            <div className='flex margin-top-20'>
              <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={true} />
            </div>
          </>
        )}
      </MdCard>
    </AppContent>
  );
});
