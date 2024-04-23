import { MdAlert, MdBouttonGroup, MdButton, MdCard, MdTypo, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import AppContent from '../../../app/content/AppContent';

export interface INotFoundPageProps {
  apiUrl: string;
  emailContact?: string;
}

const NotFoundPage: React.FC<INotFoundPageProps> = memo(({ apiUrl, emailContact }) => {
  const { Trans } = useAppTranslate();

  return (
    <AppContent
      apiUrl={apiUrl}
      className='page-404'
      seoTitle='SEO:NOT_FOUND.TITLE'
      seoDescription='SEO:NOT_FOUND.DESCRIPTION'>
      <MdCard title='NOT_FOUND_PAGE'>
        <br />
        <MdAlert severity='error' label='NOT_FOUND_PAGE_DESCRIPTION' />
        <div style={{ margin: '35px 0px 60px', color: 'primary.main' }}>
          <h5>
            <Trans i18nKey='CONTACT_ME' />
            <br />
            <br />
          </h5>
          <MdTypo color='secondary' sx={{ display: 'flex', justifyContent: 'center' }}>
            <a href={'mailto:' + emailContact} style={{ fontSize: '1.2rem' }}>
              {emailContact}
            </a>
          </MdTypo>
        </div>
        <div className='flex align-center'>
          <MdBouttonGroup>
            <MdButton color='secondary' label='BACk_TO_HOME' url='/' />
          </MdBouttonGroup>
        </div>
      </MdCard>
    </AppContent>
  );
});

export default NotFoundPage;
