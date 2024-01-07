import { MdCard } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode } from 'react';
import CustomModale, { ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';

export interface ICustomModaleCardProps extends ICustomModaleChildProps {
  title: string;
  buttonChildren?: ReactNode;
  children: ICustomModalChildrenType;
}

const CustomModaleCard: React.FC<ICustomModaleCardProps> = ({ title, buttonChildren, children, ...rest }) => {
  return (
    <CustomModale {...rest} className={'modal-card ' + rest.className}>
      {(props) => (
        <MdCard title={title} buttonchildren={<>{buttonChildren && <>{buttonChildren}</>}</>}>
          {children(props)}
        </MdCard>
      )}
    </CustomModale>
  );
};

export default CustomModaleCard;
