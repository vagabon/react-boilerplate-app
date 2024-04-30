import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { memo, useEffect } from 'react';
import AppContent from '../../../../app/content/AppContent';
import HasRole from '../../../../hook/role/HasRole';
import { IAppChatbotButtonProps } from '../../../custom/chatbot/component/CustomChatbotButton';
import { INewsRouterProps } from '../../NewsRouter';
import NewsCard from '../../component/card/NewsCard';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps, IAppChatbotButtonProps {}

const NewsShowPage: React.FC<INewsShowPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const {
    params: { id },
  } = useAppRouter();
  const { news, fetchById } = useCreateNews(rest.apiUrl, endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <HasRole roles={[]}>
      <AppContent
        id={id}
        className='mardown-with-summary'
        seo='SEO:NEWS'
        seoTitle={news?.title}
        seoDescription={news?.description}
        {...rest}>
        {id && <NewsCard {...rest} news={news ?? {}} endPoint={endPoint} />}
      </AppContent>
    </HasRole>
  );
});

export default NewsShowPage;
