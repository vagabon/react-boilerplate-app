import { fireEvent, render } from '@testing-library/react';
import { AppInfiniteScroll } from './AppInfiniteScroll';

describe('AppInfiniteScroll', () => {
  test('Given AppInfiniteScroll When its mount Then LinearProgress is shown', () => {
    const children = () => {
      return <div style={{ width: '1500px', height: '1500px' }}></div>;
    };
    const { container } = render(
      <AppInfiniteScroll id='id' className='className'>
        {children}
      </AppInfiniteScroll>,
    );
    expect(container.getElementsByClassName('container')[0]).toBeDefined();
    fireEvent.scroll(container.getElementsByClassName('container')[0], { target: { scrollY: 1500 } });
  });
});
