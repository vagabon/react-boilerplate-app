import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useAppTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useAppTranslate';
import { I18nUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/i18n/I18nUtils';
import { memo, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export interface IBaseCustomSeoProps {
  apiUrl: string;
}

export interface ICustomSeoProps extends IBaseCustomSeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
}

export const CustomSeo: React.FC<ICustomSeoProps> = memo(({ apiUrl, title, description, image, type, date }) => {
  const { t } = useAppTranslate();
  const { location } = useAppRouter();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(window.location.origin + location.pathname);
  }, [location]);

  const getImage = useCallback(
    (image: string) => {
      if (image === '') {
        return window.location.origin + 'images/logo.png';
      }
      if (image && !image.includes('http://') && !image.startsWith('https://')) {
        return apiUrl + '/file/download?fileName=' + image;
      }
      return image;
    },
    [apiUrl],
  );

  return (
    <Helmet data-rh='true' ata-react-helmet='true'>
      <title data-rh='true'>{I18nUtils.translate(t, title as string)}</title>
      <link rel='canonical' href={url} />
      <meta name='description' content={I18nUtils.translate(t, description as string)} data-rh='true' />
      <meta property='og:type' content={type ?? 'webapp'} />
      <meta property='og:title' content={I18nUtils.translate(t, title as string)} />
      {image && <meta property='og:image' content={getImage(image)} />}
      <meta property='og:description' content={I18nUtils.translate(t, description as string)} />
      <meta name='twitter:creator' content={'@VagabondDev'} />
      <meta name='twitter:card' content={type ?? 'webapp'} />
      <meta name='twitter:title' content={I18nUtils.translate(t, title as string)} />
      <meta name='twitter:description' content={I18nUtils.translate(t, description as string)} />
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          url: { url },
          name: { title: I18nUtils.translate(t, title as string) },
          image: image ? [getImage(image)] : [],
          author: {
            '@type': 'Organization',
            name: 'Vagabond',
          },
          datePublished: { date: date?.toLocaleString() ?? new Date() },
          description: { description: I18nUtils.translate(t, description as string) },
          keywords: 'vagabond,blog,react,quarkus',
        })}
      </script>
    </Helmet>
  );
});
