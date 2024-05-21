import { PropsWithChildren, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTemplateScrollHandle } from '../../hook/useTemplateScrollHandle';

export interface IContainerProps extends PropsWithChildren {}

export const Container: React.FC<IContainerProps> = ({ children }) => {
  const mainContainer = useRef<HTMLDivElement | null>(null);
  const { handleScroll } = useTemplateScrollHandle();
  const location = useLocation();

  return (
    <div ref={mainContainer} className='main-container' onScroll={handleScroll(mainContainer, location.pathname)}>
      {children}
    </div>
  );
};
