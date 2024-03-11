import { MdButton, MdCard, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContent from '../../../../app/content/AppContent';
import { useAppSelector } from '../../../../store/Store';
import { useAuth } from '../../hook/useAuth';
import AuthService from '../../service/AuthService';

const ActivationPage: React.FC = () => {
  const { Trans } = useAppTranslate();
  const params = useParams();
  const [isActivated, setIsActivated] = useState<boolean | undefined>(undefined);

  const { message } = useAppSelector((state) => state.common);
  const { redirectIfLogged } = useAuth();

  useEffect(() => {
    redirectIfLogged();
  }, [redirectIfLogged]);

  useEffect(() => {
    if (params.token) {
      AuthService.activation(params.token).then(() => {
        setIsActivated(true);
      });
    }
  }, [params.token]);

  useEffect(() => {
    if (message !== '') {
      setIsActivated(false);
    } else {
      setIsActivated(undefined);
    }
  }, [message]);

  return (
    <AppContent seoTitle='SEO:ACTIVATION.TITLE' seoDescription='SEO:ACTIVATION.DESCRIPTION'>
      <MdCard title='AUTH:ACTIVATION.TITLE'>
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
};

export default ActivationPage;
