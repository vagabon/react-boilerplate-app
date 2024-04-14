import { useId } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, memo } from 'react';
import CustomSeo from '../../module/custom/seo/component/CustomSeo';

export interface IAppContentProps {
  apiUrl: string;
  website: string;
  id?: string;
  className?: string;
  image?: string;
  date?: string;
  children: ReactNode;
  seoTitle: string;
  seoDescription: string;
}

const AppContent: React.FC<IAppContentProps> = memo(
  ({ apiUrl, website, className = '', image, date, seoTitle, seoDescription, ...props }) => {
    const { id } = useId(props.id);

    return (
      <>
        <CustomSeo
          apiUrl={apiUrl}
          website={website}
          title={seoTitle}
          description={seoDescription}
          image={image}
          date={date}
        />
        <div id={id} className={'max-width ' + className}>
          {props.children}
        </div>
      </>
    );
  },
);

export default AppContent;
