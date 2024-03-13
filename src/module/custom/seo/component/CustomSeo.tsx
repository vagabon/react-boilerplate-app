import { I18nUtils, WindowUtils, useAppRouter, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const WEBSITE_TITLE = WindowUtils.getEnv('WEBSITE_TITLE') as string;
const API_URL = WindowUtils.getEnv('API_URL') as string;

export interface ICustomSeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
}

const CustomSeo: React.FC<ICustomSeoProps> = ({
  title,
  description,
  image = '',
  type = 'webapp',
  date = new Date(),
}) => {
  const { t } = useAppTranslate();
  const { location } = useAppRouter();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(window.location.origin + location.pathname);
  }, [location]);

  const getImage = useCallback((image: string) => {
    if (image === '') {
      return window.location.origin + 'images/logo.png';
    }
    if (image && !image.includes('http://') && !image.startsWith('https://')) {
      return API_URL + '/download?fileName=' + image;
    }
    return image;
  }, []);

  return (
    <Helmet data-rh='true' ata-react-helmet='true'>
      <title data-rh='true'>{WEBSITE_TITLE + ' | ' + I18nUtils.translate(t, title as string)}</title>
      <link rel='canonical' href={url} />
      <meta name='description' content={I18nUtils.translate(t, description as string)} data-rh='true' />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={WEBSITE_TITLE + ' | ' + I18nUtils.translate(t, title as string)} />
      {image && <meta property='og:image' content={getImage(image)} />}
      <meta property='og:description' content={I18nUtils.translate(t, description as string)} />
      <meta name='twitter:creator' content={'@VagabondDev'} />
      <meta name='twitter:card' content={type} />
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
          datePublished: { date: date.toLocaleString() },
          description: { description: I18nUtils.translate(t, description as string) },
          keywords: 'vagabond,blog,react,quarkus',
        })}
      </script>
    </Helmet>
  );
};

export default CustomSeo;
