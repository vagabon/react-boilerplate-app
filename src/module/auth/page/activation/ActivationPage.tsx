import { MdButton, MdCard } from '@vagabond-inc/react-boilerplate-md';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AppContent from '../../../../app/content/AppContent';
import { useAppSelector } from '../../../../store/Store';
import AuthService from '../../service/AuthService';

const ActivationPage: React.FC = () => {
  const params = useParams();
  const [isActivated, setIsActivated] = useState<boolean | undefined>(undefined);

  const { message } = useAppSelector((state) => state.common);

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
    <AppContent>
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
