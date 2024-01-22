import { MdCard, MdMarkdown } from '@vagabond-inc/react-boilerplate-md';
import { useRole } from '../../../../hook/role/useRole';
import { CustomSeoUtils } from '../../../custom/seo/utils/CustomSeoUtils';
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
      date={props.news.updatedDate}
      url={'/' + props.endPoint + '/show/' + props.news.id + '/' + CustomSeoUtils.convertTitle(props.news.title)}
      urlUpdate={hasUserRole(['ADMIN']) ? '/' + props.endPoint + '/update/' + props.news.id : undefined}>
      <MdMarkdown content={props.news.resume}></MdMarkdown>
    </MdCard>
  );
};

export default NewsCardSmall;
