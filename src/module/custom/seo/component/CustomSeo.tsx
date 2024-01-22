import { WindowUtils } from '@vagabond-inc/react-boilerplate-md';
import { Helmet } from 'react-helmet-async';

export interface ICustomSeoProps {
  title?: string;
  description?: string;
  type?: string;
}

const WEBSITE_TITLE = WindowUtils.getEnv('WEBSITE_TITLE');

const CustomSeo: React.FC<ICustomSeoProps> = ({ title, description, type = 'webapp' }) => {
  return (
    <Helmet data-rh='true' ata-react-helmet='true'>
      <title data-rh='true'>{WEBSITE_TITLE + ' | ' + title}</title>
      <meta name='description' content={description} data-rh='true' />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={WEBSITE_TITLE + ' | ' + title} />
      <meta property='og:description' content={description} />
      <meta name='twitter:creator' content={'@VagabondDev'} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
};

export default CustomSeo;
