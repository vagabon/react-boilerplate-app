import React, { ReactNode, memo } from 'react';
import { AppScrollInfiniteContainer } from './container/AppScrollInfiniteContainer';

export interface IAppInfiniteScrollProps {
  id: string;
  className?: string;
  children?: ReactNode;
  callBack?: () => void;
}

export const AppInfiniteScroll: React.FC<IAppInfiniteScrollProps> = memo(({ className = '', callBack, ...rest }) => {
  return (
    <AppScrollInfiniteContainer id={rest.id} className={className} callBack={callBack}>
      <div className='max-width'>{rest.children}</div>
    </AppScrollInfiniteContainer>
  );
});
