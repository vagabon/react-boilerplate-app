import { act, fireEvent, render } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';
import { useRef } from 'react';

jest.useFakeTimers();

describe('useClickOutside', () => {
  test('Given useClickOutside When click outside Then close method is called', async () => {
    const closeMock = jest.fn();
    const ReactTested = () => {
      const containerRef = useRef(null);
      useClickOutside(containerRef, closeMock);
      return (
        <>
          <div className='test'></div>
          <div className='another' ref={containerRef}></div>
        </>
      );
    };
    const { container } = render(<ReactTested />);
    await act(() => {
      fireEvent.mouseDown(container.getElementsByClassName('test')[0]);
      jest.runAllTimers();
    });
    expect(closeMock).toBeCalledTimes(1);
    fireEvent.mouseDown(container.getElementsByClassName('another')[0]);
    expect(closeMock).toBeCalledTimes(1);
  });
});
