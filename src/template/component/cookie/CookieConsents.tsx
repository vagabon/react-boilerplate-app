import { Fade, Paper, Unstable_TrapFocus as TrapFocus } from '@mui/material';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { useCallback, useState } from 'react';
import { AppStorageUtils } from '../../../app/storage/utils/AppStorageUtils';

export const CookieConsents: React.FC = () => {
  const [bannerOpen, setBannerOpen] = useState(!AppStorageUtils.getConsent());

  const closeBanner = useCallback(
    (consent: boolean) => () => {
      AppStorageUtils.setConsent(consent);
      setBannerOpen(false);
    },
    [],
  );

  return (
    <>
      {bannerOpen && (
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
                  <MdTypo content='COOKIE.TITLE' component='b' />
                  <MdTypo content='COOKIE.DESC' />
                </div>
                <div className='flex-row gap10'>
                  <MdButton label='COOKIE.BUTTON.ALLOW' callback={closeBanner(true)} />
                  <MdButton label='COOKIE.BUTTON.REJECT' callback={closeBanner(false)} variant='outlined' />
                </div>
              </div>
            </Paper>
          </Fade>
        </TrapFocus>
      )}
    </>
  );
};
