import { MdCard, MdMarkdown } from '@vagabond-inc/react-boilerplate-md';
import { useRole } from '../../../../hook/role/useRole';
import { INewsCardProps } from './NewsCard';

export interface INewsCardSmallProps extends INewsCardProps {}

const NewsCardSmall: React.FC<INewsCardSmallProps> = (props: INewsCardSmallProps) => {
  const { hasUserRole } = useRole();

  return (
    <MdCard
      title={props.news.title}
      avatar={props.news.avatar}
      image={props.news.image}
      date={props.news.updatedDate}
      url={'/news/show/' + props.news.id}
      urlUpdate={hasUserRole(['ADMIN']) ? '/news/update/' + props.news.id : undefined}>
      <MdMarkdown content={props.news.description?.split('\n')![0]}></MdMarkdown>
    </MdCard>
  );
};

export default NewsCardSmall;
