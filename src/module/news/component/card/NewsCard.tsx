import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdChip } from '@vagabond-inc/react-boilerplate-md/dist/md/component/chip/MdChip';
import { MdMarkdown } from '@vagabond-inc/react-boilerplate-md/dist/md/component/markdown/MdMarkdown';
import { useId } from '@vagabond-inc/react-boilerplate-md/dist/md/hook/useId';
import { memo, useCallback, useState } from 'react';
import { useAppMessage } from '../../../../app/message/hook/useAppMessage';
import { CustomChatbotButton, ICustomChatbotButtonProps } from '../../../custom/chatbot/component/CustomChatbotButton';
import { useProfile } from '../../../user/profile/hook/useProfile';
import { INewsDto } from '../../dto/NewsDto';
import { NewsShare } from '../share/NewsShare';

export interface INewsCardProps extends ICustomChatbotButtonProps {
  apiUrl: string;
  news: INewsDto;
  endPoint: string;
  withSummary?: boolean;
}

export const NewsCard: React.FC<INewsCardProps> = memo(({ apiUrl, news, endPoint, withSummary = true, ...rest }) => {
  const { id } = useId();
  const { hasUserRole } = useProfile();
  const { setMessage } = useAppMessage();
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
        image={apiUrl + '/file/download?fileName=' + news.image}
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
            {news.tags?.split(',').map((tag) => <MdChip key={tag} label={tag} color='default' />)}
          </div>
          <NewsShare news={news} endPoint={endPoint} />
        </MdCard>
      )}
    </>
  );
});
