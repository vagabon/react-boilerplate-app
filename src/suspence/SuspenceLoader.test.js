import { render, screen } from '@testing-library/react';
import { SuspenceLoader } from './SuspenceLoader';

const ReactComponent = () => {
  return <>TEST</>;
};

describe('SuspenceLoader', () => {
  test('Give SuspenceLoader When component is mount Then loader class name is found', () => {
    render(<>{SuspenceLoader(<ReactComponent />)}</>);
    expect(screen.getByText('TEST')).toBeDefined();
  });
});
