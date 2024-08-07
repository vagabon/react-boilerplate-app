import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdMarkdown } from '@vagabond-inc/react-boilerplate-md/dist/md/component/markdown/MdMarkdown';
import { memo } from 'react';
import { CustomSeoUtils } from '../../../custom/seo/utils/CustomSeoUtils';
import { useProfile } from '../../../user/profile/hook/useProfile';
import { INewsCardProps } from './NewsCard';

export interface INewsCardSmallProps extends INewsCardProps {
  apiUrl: string;
  endPoint: string;
}

export const NewsCardSmall: React.FC<INewsCardSmallProps> = memo(({ apiUrl, ...rest }) => {
  const { hasUserRole } = useProfile();

  return (
    <MdCard
      title={rest.news.title}
      image={apiUrl + '/file/download?fileName=' + rest.news.image}
      date={rest.news.creationDate}
      url={'/' + rest.endPoint + '/show/' + rest.news.id + '/' + CustomSeoUtils.convertTitle(rest.news.title)}
      urlUpdate={hasUserRole(['ADMIN']) ? '/' + rest.endPoint + '/update/' + rest.news.id : undefined}>
      <MdMarkdown content={rest.news.resume}></MdMarkdown>
      <MdLink
        className='font-weight-450 text-underline'
        href={'/' + rest.endPoint + '/show/' + rest.news.id + '/' + CustomSeoUtils.convertTitle(rest.news.title)}
        label='Lire la suite...'
      />
    </MdCard>
  );
});
