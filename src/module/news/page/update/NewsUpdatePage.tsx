import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../../../app/content/component/AppContent';
import { ICustomChatbotButtonProps } from '../../../custom/chatbot/component/CustomChatbotButton';
import { ProfileRole } from '../../../user/profile/component/role/ProfileRole';
import { INewsRouterProps } from '../../NewsRouter';
import { NewsForm } from '../../component/form/NewsForm';
import { useCreateNews } from '../../hook/useCreateNews';

export interface INewsShowPageProps extends INewsRouterProps, ICustomChatbotButtonProps {}

export const NewsUpdatePage: React.FC<INewsShowPageProps> = memo(({ endPoint, newsAction, ...rest }) => {
  const { id } = useParams();
  const { news, fetchById } = useCreateNews(rest.apiUrl, endPoint, newsAction, parseInt(id as string));

  useEffect(() => {
    fetchById(id);
  }, [id, fetchById]);

  return (
    <AppContent {...rest} id='news-form' className='markdown-form' seo='SEO:NEWS'>
      <ProfileRole roles={['ADMIN']}>
        {<NewsForm {...rest} endPoint={endPoint} newsAction={newsAction} news={news ?? {}} />}
      </ProfileRole>
    </AppContent>
  );
});
