import { useId } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode } from 'react';

export interface IAppContentProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const AppContent: React.FC<IAppContentProps> = ({ className = '', ...props }) => {
  const { id } = useId(props.id);

  return (
    <div id={id} className={'max-width ' + className}>
      {props.children}
    </div>
  );
};

export default AppContent;
