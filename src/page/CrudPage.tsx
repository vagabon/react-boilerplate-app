import { ReactNode } from 'react';
import AppFabAdd, { IAppFabAddProps } from '../app/fab/add/AppFabAdd';

export interface CrudPageProps extends IAppFabAddProps {
  className?: string;
  children: ReactNode;
  doCreate?: () => void;
}

const CrudPage: React.FC<CrudPageProps> = (props: CrudPageProps) => {
  return (
    <>
      <div className='main-container'>
        <div className={'flex container ' + props.className}>{props.children}</div>
      </div>
      <AppFabAdd {...props} />
    </>
  );
};

export default CrudPage;
