import { useId } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode } from 'react';
import CustomSeo from '../../module/custom/seo/component/CustomSeo';

export interface IAppContentProps {
  id?: string;
  className?: string;
  children: ReactNode;
  seoTitle: string;
  seoDescription: string;
}

const AppContent: React.FC<IAppContentProps> = ({ className = '', seoTitle, seoDescription, ...props }) => {
  const { id } = useId(props.id);

  return (
    <>
      <CustomSeo title={seoTitle} description={seoDescription} image={''} date={''} />
      <div id={id} className={'max-width ' + className}>
        {props.children}
      </div>
    </>
  );
};

export default AppContent;
