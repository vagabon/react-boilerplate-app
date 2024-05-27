import { ReactNode, Suspense } from 'react';

export const AppSuspenceLoader = (component: ReactNode) => {
  return (
    <Suspense
      fallback={
        <div className='fr-loader'>
          <div></div>
        </div>
      }>
      {component}
    </Suspense>
  );
};
