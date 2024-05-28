import React, { PropsWithChildren, Suspense } from 'react';

export interface IAppSuspenceLoaderProps extends PropsWithChildren {}

export const AppSuspenceLoader: React.FC<IAppSuspenceLoaderProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className='fr-loader'>
          <div></div>
        </div>
      }>
      {children}
    </Suspense>
  );
};
