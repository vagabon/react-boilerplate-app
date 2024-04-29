import { MdCard, MdChip, MdMarkdown, useId } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback, useState } from 'react';
import { useMessage } from '../../../../hook/message/useMessage';
import { useRole } from '../../../../hook/role/useRole';
import CustomChatbotButton, { IAppChatbotButtonProps } from '../../../custom/chatbot/component/CustomChatbotButton';
import { INewsDto } from '../../dto/NewsDto';
import NewsShare from '../share/NewsShare';

export interface INewsCardProps extends IAppChatbotButtonProps {
  apiUrl: string;
  news: INewsDto;
  endPoint: string;
  withSummary?: boolean;
}

const NewsCard: React.FC<INewsCardProps> = memo(({ apiUrl, news, endPoint, withSummary = true, ...rest }) => {
  const { id } = useId();
  const { hasUserRole } = useRole();
  const { setMessage } = useMessage();
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
    <>
      <MdCard
        title={news.title}
        avatar={apiUrl + '/download?fileName=' + news.avatar}
        image={apiUrl + '/download?fileName=' + news.image}
        date={news.creationDate}
        urlUpdate={hasUserRole(['ADMIN']) ? '/' + endPoint + '/update/' + news.id : undefined}
        actions={<CustomChatbotButton integrations={rest.integrations} />}>
        <MdMarkdown
          content={news.description}
          summaryCallback={summaryCallback(news.title)}
          callbackCopy={setMessage}></MdMarkdown>
      </MdCard>
      {withSummary && (
        <MdCard className='md-summary'>
          <MdMarkdown content={summary}></MdMarkdown>
          <div className='news-tags'>
            {news.tags?.split(',').map((tag) => <MdChip key={tag} label={tag} color='info' />)}
          </div>
          <NewsShare news={news} endPoint={endPoint} />
        </MdCard>
      )}
    </>
  );
});

export default NewsCard;
