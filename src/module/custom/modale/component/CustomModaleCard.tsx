import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { ReactNode, memo } from 'react';
import { CustomModale, ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';

export interface ICustomModaleCardProps extends ICustomModaleChildProps {
  title: string;
  buttonChildren?: ReactNode;
  children: ICustomModalChildrenType;
}

export const CustomModaleCard: React.FC<ICustomModaleCardProps> = memo(
  ({ title, buttonChildren, children, ...rest }) => {
    return (
      <CustomModale {...rest} className={'modal-card ' + rest.className}>
        {(props) => (
          <MdCard title={title} buttonchildren={<>{buttonChildren && <>{buttonChildren}</>}</>}>
            {children(props)}
          </MdCard>
        )}
      </CustomModale>
    );
  },
);
