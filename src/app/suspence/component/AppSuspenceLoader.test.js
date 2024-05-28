import { render, screen } from '@testing-library/react';
import { AppSuspenceLoader } from './AppSuspenceLoader';

const ReactComponent = () => {
  return <>TEST</>;
};

describe('AppSuspenceLoader', () => {
  test('Give AppSuspenceLoader When component is mount Then loader class name is found', () => {
    render(
      <AppSuspenceLoader>
        <ReactComponent />
      </AppSuspenceLoader>,
    );
    expect(screen.getByText('TEST')).toBeDefined();
  });
});
