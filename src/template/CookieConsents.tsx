import { Fade, Paper } from '@mui/material';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { MdButton, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useState } from 'react';
import { StorageUtils } from '../utils/storage/StorageUtils';

const CookieConsents: React.FC = () => {
  const { Trans } = useAppTranslate();
  const [bannerOpen, setBannerOpen] = useState(!StorageUtils.getConsent());

  const closeBanner = useCallback(
    (consent: boolean) => () => {
      StorageUtils.setConsent(consent);
      setBannerOpen(false);
    },
    [],
  );

  return (
    <TrapFocus open disableAutoFocus disableEnforceFocus>
      <Fade appear={true} in={bannerOpen}>
        <Paper
          aria-modal='false'
          aria-label='Cookie banner'
          elevation={24}
          tabIndex={-1}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            m: 0,
            p: '40px 30px 30px 30px',
            borderWidth: 0,
            borderTopWidth: 1,
            zIndex: 2000,
          }}>
          <div className='flex-row align-center space-between'>
            <div className='flex align-start'>
              <b>
                <Trans i18nKey='COOKIE.TITLE' />
              </b>
              <Trans i18nKey='COOKIE.DESC' />
            </div>
            <div className='flex-row gap10'>
              <MdButton label='COOKIE.BUTTON.ALLOW' callback={closeBanner(true)} />
              <MdButton label='COOKIE.BUTTON.REJECT' callback={closeBanner(false)} variant='outlined' />
            </div>
          </div>
        </Paper>
      </Fade>
    </TrapFocus>
  );
};
export default CookieConsents;
