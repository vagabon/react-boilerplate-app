import { fireEvent, render } from '@testing-library/react';
import AppInfiniteScrool from './AppInfiniteScrool';

describe('AppInfiniteScrool', () => {
  test('Given AppInfiniteScrool When its mount Then LinearProgress is shown', () => {
    const children = () => {
      return <div style={{ width: '1500px', height: '1500px' }}></div>;
    };
    const { container } = render(
      <AppInfiniteScrool id='id' className='className'>
        {children}
      </AppInfiniteScrool>,
    );
    expect(container.getElementsByClassName('container')[0]).toBeDefined();
    fireEvent.scroll(container.getElementsByClassName('container')[0], { target: { scrollY: 1500 } });
  });
});
