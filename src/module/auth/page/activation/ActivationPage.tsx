import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { memo, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../../../app/content/AppContent';
import { useAppSelector } from '../../../../store/Store';
import { IHeaderDto } from '../../../../template/dto/HeaderDto';
import { useAuth } from '../../hook/useAuth';
import { AuthService } from '../../service/AuthService';

export interface IActivationPageProps extends IHeaderDto {}

export const ActivationPage: React.FC<IActivationPageProps> = memo(({ ...rest }) => {
  const params = useParams();
  const [isActivated, setIsActivated] = useState<boolean | undefined>(undefined);

  const message = useAppSelector((state) => state.common.message, shallowEqual);
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
        {isActivated === undefined && <MdTypo content='AUTH:ACTIVATION.CURRENT' />}
        {isActivated === false && <MdTypo content='AUTH:ACTIVATION.FAIL' />}
        {isActivated === true && (
          <>
            <MdTypo content='AUTH:ACTIVATION.ACTIVATED' />
            <div className='flex margin-top-20'>
              <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={true} />
            </div>
          </>
        )}
      </MdCard>
    </AppContent>
  );
});
