import { memo, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export interface IBaseCustomSeoProps {
  apiUrl: string;
}

export interface ICustomSeoProps extends IBaseCustomSeoProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  date?: string;
}

export const CustomSeo: React.FC<ICustomSeoProps> = memo(({ apiUrl, title = '', description, image, type, date }) => {
  const { t } = useTranslation();
  const location = useLocation();
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
      <title data-rh='true'>{t(title)}</title>
      <link rel='canonical' href={url} />
      <meta name='description' content={t(description)} data-rh='true' />
      <meta property='og:type' content={type ?? 'webapp'} />
      <meta property='og:title' content={t(title)} />
      {image && <meta property='og:image' content={getImage(image)} />}
      <meta property='og:description' content={t(description)} />
      <meta name='twitter:creator' content={'@VagabondDev'} />
      <meta name='twitter:card' content={type ?? 'webapp'} />
      <meta name='twitter:title' content={t(title)} />
      <meta name='twitter:description' content={t(description)} />
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          url: { url },
          name: { title: t(title) },
          image: image ? [getImage(image)] : [],
          author: {
            '@type': 'Organization',
            name: 'Vagabond',
          },
          datePublished: { date: date?.toLocaleString() ?? new Date() },
          description: { description: t(description) },
          keywords: 'vagabond,blog,react,quarkus',
        })}
      </script>
    </Helmet>
  );
});
