import { PropsWithChildren, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppScrollHandle } from '../../hook/useAppScrollHandle';

export interface IContainerProps extends PropsWithChildren {}

export const Container: React.FC<IContainerProps> = ({ children }) => {
  const mainContainer = useRef<HTMLDivElement | null>(null);
  const { handleScroll } = useAppScrollHandle();
  const location = useLocation();

  return (
    <div ref={mainContainer} className='main-container' onScroll={handleScroll(mainContainer, location.pathname)}>
      {children}
    </div>
  );
};
