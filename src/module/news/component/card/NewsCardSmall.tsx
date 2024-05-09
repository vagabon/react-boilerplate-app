import { MdCard, MdLink, MdMarkdown } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import { useRole } from '../../../../hook/role/useRole';
import { CustomSeoUtils } from '../../../custom/seo/utils/CustomSeoUtils';
import NewsShare from '../share/NewsShare';
import { INewsCardProps } from './NewsCard';

export interface INewsCardSmallProps extends INewsCardProps {
  apiUrl: string;
  endPoint: string;
}

const NewsCardSmall: React.FC<INewsCardSmallProps> = memo(({ apiUrl, ...rest }) => {
  const { hasUserRole } = useRole();

  return (
    <MdCard
      title={rest.news.title}
      avatar={apiUrl + '/file/download?fileName=' + rest.news.avatar}
      image={apiUrl + '/file/download?fileName=' + rest.news.image}
      date={rest.news.creationDate}
      url={'/' + rest.endPoint + '/show/' + rest.news.id + '/' + CustomSeoUtils.convertTitle(rest.news.title)}
      urlUpdate={hasUserRole(['ADMIN']) ? '/' + rest.endPoint + '/update/' + rest.news.id : undefined}>
      <MdMarkdown content={rest.news.resume}></MdMarkdown>
      <MdLink
        href={'/' + rest.endPoint + '/show/' + rest.news.id + '/' + CustomSeoUtils.convertTitle(rest.news.title)}
        label='Lire la suite...'
      />
      <NewsShare {...rest} />
    </MdCard>
  );
});

export default NewsCardSmall;
