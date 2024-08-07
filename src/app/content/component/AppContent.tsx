import { useId } from '@vagabond-inc/react-boilerplate-md/dist/md/hook/useId';
import { ReactNode, memo } from 'react';
import { CustomSeo } from '../../../module/custom/seo/component/CustomSeo';
import { IHeaderDto } from '../../../template/dto/HeaderDto';

export interface IAppContentProps extends IHeaderDto {
  id?: string;
  className?: string;
  date?: string;
  children: ReactNode;
  seo?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const AppContent: React.FC<IAppContentProps> = memo(
  ({ id, className = '', date, seo, seoTitle, seoDescription, ...rest }) => {
    const { id: divId } = useId(id);

    return (
      <>
        <CustomSeo
          apiUrl={rest.apiUrl}
          title={seoTitle ?? seo + '.TITLE'}
          description={seoDescription ?? seo + '.DESCRIPTION'}
          image={rest.image}
          date={date}
        />
        <div id={divId} className={'max-width ' + className}>
          {rest.children}
        </div>
      </>
    );
  },
);
