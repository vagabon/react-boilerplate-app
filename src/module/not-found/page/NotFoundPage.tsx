import {
  MdAlert,
  MdBouttonGroup,
  MdButton,
  MdCard,
  MdLink,
  MdTypo,
  useAppTranslate,
} from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import AppContent from '../../../app/content/AppContent';
import { IHeaderProp } from '../../../template/Header';

export interface INotFoundPageProps extends IHeaderProp {}

const NotFoundPage: React.FC<INotFoundPageProps> = memo(({ ...rest }) => {
  const { Trans } = useAppTranslate();

  return (
    <AppContent className='page-404' seo='SEO:NOT_FOUND' {...rest}>
      <MdCard title='NOT_FOUND_PAGE'>
        <br />
        <MdAlert severity='error' label='NOT_FOUND_PAGE_DESCRIPTION' />
        <div style={{ margin: '5px 0px 60px', color: 'primary.main' }}>
          <h5>
            <Trans i18nKey='CONTACT_ME' />
          </h5>
          <MdTypo color='secondary' sx={{ display: 'flex', justifyContent: 'center' }}>
            <MdLink href={'mailto:' + rest.email} label={rest.email} sx={{ fontSize: '1.2rem' }} />
          </MdTypo>
        </div>
        <div className='flex align-center'>
          <MdBouttonGroup>
            <MdButton color='secondary' label='BACK_TO_HOME' url='/' />
          </MdBouttonGroup>
        </div>
      </MdCard>
    </AppContent>
  );
});

export default NotFoundPage;
