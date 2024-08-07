import { memo, useEffect, useState } from 'react';
import { CustomSeoUtils } from '../../../custom/seo/utils/CustomSeoUtils';
import { CustomShareButtons } from '../../../custom/share/component/CustomShareButtons';
import { INewsDto } from '../../dto/NewsDto';

export interface INewsShareProps {
  endPoint: string;
  news: INewsDto;
}

export const NewsShare: React.FC<INewsShareProps> = memo(({ endPoint, news }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const newsUrl =
      window.location.origin + '/' + endPoint + '/show/' + news?.id + '/' + CustomSeoUtils.convertTitle(news?.title);
    setUrl(newsUrl);
  }, [endPoint, news]);

  return <CustomShareButtons url={url} />;
});
