import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { PropsWithChildren, useRef } from 'react';
import { useAppScrollHandle } from '../../hook/useAppScrollHandle';

export interface IContainerProps extends PropsWithChildren {}

export const Container: React.FC<IContainerProps> = ({ children }) => {
  const mainContainer = useRef<HTMLDivElement | null>(null);
  const { handleScroll } = useAppScrollHandle();
  const { location } = useAppRouter();

  return (
    <div ref={mainContainer} className='main-container' onScroll={handleScroll(mainContainer, location.pathname)}>
      {children}
    </div>
  );
};
