import { WindowUtils, useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const WEBSITE_TITLE = WindowUtils.getEnv('WEBSITE_TITLE');
const API_URL: string = WindowUtils.getEnv('API_URL');

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
  image = 'https://blog.vagabond.synology.me/images/logo.png',
  type = 'webapp',
  date,
}) => {
  const { location } = useAppRouter();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(window.location.origin + location.pathname);
  }, [location]);

  const getImage = useCallback((image: string) => {
    if (image && !image.includes('http://') && !image.startsWith('https://')) {
      return API_URL + '/download?fileName=' + image;
    }
    return image;
  }, []);

  return (
    <Helmet data-rh='true' ata-react-helmet='true'>
      <title data-rh='true'>{WEBSITE_TITLE + ' | ' + title}</title>
      <link rel='canonical' href={url} />
      <meta name='description' content={description} data-rh='true' />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={WEBSITE_TITLE + ' | ' + title} />
      <meta property='og:image' content={getImage(image)} />
      <meta property='og:description' content={description} />
      <meta name='twitter:creator' content={'@VagabondDev'} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Recipe',
          name: { title },
          image: [getImage(image)],
          author: {
            '@type': 'Organization',
            name: 'Vagabond',
          },
          datePublished: { date },
          description: { description },
          keywords: 'vagabond,blog,react,quarkus',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            ratingCount: '12',
          },
        })}
      </script>
    </Helmet>
  );
};

export default CustomSeo;
