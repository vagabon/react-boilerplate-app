import { MdAlert } from '@vagabond-inc/react-boilerplate-md/dist/md/component/alert/MdAlert';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdBouttonGroup } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/group/MdBouttonGroup';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { Translate } from '@vagabond-inc/react-boilerplate-md/dist/translate/component/Translate';
import { memo } from 'react';
import { AppContent } from '../../../app/content/component/AppContent';
import { IHeaderDto } from '../../../template/dto/HeaderDto';

export interface INotFoundPageProps extends IHeaderDto {}

export const NotFoundPage: React.FC<INotFoundPageProps> = memo(({ ...rest }) => {
  return (
    <AppContent className='page-404' seo='SEO:NOT_FOUND' {...rest}>
      <MdCard title='NOT_FOUND_PAGE'>
        <br />
        <MdAlert severity='error' label='NOT_FOUND_PAGE_DESCRIPTION' />
        <div className='contact text-primary'>
          <h5>
            <Translate i18nKey='CONTACT_ME' />
          </h5>
          <MdTypo className='flex justify-center' color='secondary'>
            <MdLink href={'mailto:' + rest.email} className='text-xl' label={rest.email} />
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
