import { MdCard, MdChip, MdMarkdown, useId } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useState } from 'react';
import AppContent from '../../../../app/content/AppContent';
import { useRole } from '../../../../hook/role/useRole';
import { INewsDto } from '../../dto/NewsDto';
import NewsShare from '../share/NewsShare';

export interface INewsCardProps {
  news: INewsDto;
  endPoint: string;
}

const NewsCard: React.FC<INewsCardProps> = (props: INewsCardProps) => {
  const { id } = useId('title');
  const { hasUserRole } = useRole();
  const [summary, setSummary] = useState<string>('');

  const summaryCallback = useCallback(
    (title?: string) => (newSummary: string) => {
      let completeSummary = '';
      if (title) {
        completeSummary = '[' + title + '](#' + id + ')\n\n';
      }
      completeSummary += newSummary;
      setSummary(completeSummary);
    },
    [id],
  );

  return (
    <AppContent id={id} className='mardown-with-summary'>
      <MdCard
        title={props.news.title}
        avatar={props.news.avatar}
        image={props.news.image}
        date={props.news.creationDate}
        urlUpdate={hasUserRole(['ADMIN']) ? '/' + props.endPoint + '/update/' + props.news.id : undefined}>
        <MdMarkdown content={props.news.description} summaryCallback={summaryCallback(props.news.title)}></MdMarkdown>
      </MdCard>
      <MdCard className='md-summary'>
        <MdMarkdown content={summary}></MdMarkdown>
        <div className='news-tags'>
          {props.news.tags?.split(',').map((tag) => (
            <MdChip key={tag} label={tag} color='info' />
          ))}
        </div>
        <NewsShare {...props} />
      </MdCard>
    </AppContent>
  );
};

export default NewsCard;
