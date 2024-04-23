import { useId } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, memo } from 'react';
import CustomSeo from '../../module/custom/seo/component/CustomSeo';

export interface IAppContentProps {
  apiUrl: string;
  id?: string;
  className?: string;
  image?: string;
  date?: string;
  children: ReactNode;
  seoTitle: string;
  seoDescription: string;
}

const AppContent: React.FC<IAppContentProps> = memo(
  ({ apiUrl, className = '', image, date, seoTitle, seoDescription, ...props }) => {
    const { id } = useId(props.id);

    return (
      <>
        <CustomSeo apiUrl={apiUrl} title={seoTitle} description={seoDescription} image={image} date={date} />
        <div id={id} className={'max-width ' + className}>
          {props.children}
        </div>
      </>
    );
  },
);

export default AppContent;
