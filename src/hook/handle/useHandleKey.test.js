import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { useHandleKey } from './useHandleKey';

describe('useHandleKey', () => {
  test('Given useHandleKey when key is Escape then callback is called', () => {
    const mockCallback = jest.fn();
    const ReactTested = () => {
      const { handleAllKeyDown } = useHandleKey();
      useEffect(() => {
        handleAllKeyDown(mockCallback)({ key: 'Escape' });
      }, [handleAllKeyDown]);
      return <></>;
    };
    render(<ReactTested />);
    expect(mockCallback).toBeCalledTimes(1);
  });

  test('Given useHandleKey when there is no key then callback is not called', () => {
    const mockCallback = jest.fn();
    const ReactTested = () => {
      const { handleAllKeyDown } = useHandleKey();
      useEffect(() => {
        handleAllKeyDown(mockCallback)({ key: 'None' });
      }, [handleAllKeyDown]);
      return <></>;
    };
    render(<ReactTested />);
    expect(mockCallback).toBeCalledTimes(0);
  });
});
