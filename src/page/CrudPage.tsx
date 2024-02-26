import { ReactNode } from 'react';
import AppFabAdd, { IAppFabAddProps } from '../app/fab/add/AppFabAdd';

export interface CrudPageProps extends IAppFabAddProps {
  className?: string;
  children: ReactNode;
  doCreate?: () => void;
}

const CrudPage: React.FC<CrudPageProps> = ({ className = '', ...props }) => {
  return (
    <>
      <div className='main-container'>
        <div className={'container ' + className}>{props.children}</div>
      </div>
      <AppFabAdd {...props} />
    </>
  );
};

export default CrudPage;
