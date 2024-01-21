import { Helmet } from 'react-helmet-async';

export interface ICustomSeoProps {
  title?: string;
  description?: string;
  type?: string;
}

const CustomSeo: React.FC<ICustomSeoProps> = ({ title, description, type = 'webapp' }) => {
  return (
    <Helmet>
      <title>{'VagaBlog - ' + title}</title>
      <meta name='description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={'VagaBlog - ' + title} />
      <meta property='og:description' content={description} />
      <meta name='twitter:creator' content={'@VagabondDev'} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
};

export default CustomSeo;
