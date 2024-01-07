import { ReactNode, Suspense } from 'react';

export const SuspenceLoader = (component: ReactNode) => {
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
