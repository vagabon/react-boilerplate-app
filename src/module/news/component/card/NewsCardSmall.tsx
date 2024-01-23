import { MdCard, MdLink, MdMarkdown } from '@vagabond-inc/react-boilerplate-md';
import { useRole } from '../../../../hook/role/useRole';
import { CustomSeoUtils } from '../../../custom/seo/utils/CustomSeoUtils';
import NewsShare from '../share/NewsShare';
import { INewsCardProps } from './NewsCard';

export interface INewsCardSmallProps extends INewsCardProps {
  endPoint: string;
}

const NewsCardSmall: React.FC<INewsCardSmallProps> = (props: INewsCardSmallProps) => {
  const { hasUserRole } = useRole();

  return (
    <MdCard
      title={props.news.title}
      avatar={props.news.avatar}
      image={props.news.image}
      date={props.news.creationDate}
      url={'/' + props.endPoint + '/show/' + props.news.id + '/' + CustomSeoUtils.convertTitle(props.news.title)}
      urlUpdate={hasUserRole(['ADMIN']) ? '/' + props.endPoint + '/update/' + props.news.id : undefined}>
      <MdMarkdown content={props.news.resume}></MdMarkdown>
      <MdLink
        href={'/' + props.endPoint + '/show/' + props.news.id + '/' + CustomSeoUtils.convertTitle(props.news.title)}
        label='Lire la suite...'
      />
      <NewsShare {...props} />
    </MdCard>
  );
};

export default NewsCardSmall;
