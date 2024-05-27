import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { useAppMessage } from './useAppMessage';

const menu = [];

describe('useAppMessage', () => {
  test('Given useAppMessage when location is / then dispatch is called', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { scrolls: [] } }));
    useAppDispatchSpy.mockReturnValue(mockDispatch);
    const ReactTested = () => {
      const { message, setMessage, clearMessage } = useAppMessage(menu);

      useEffect(() => {
        setMessage('message');
        clearMessage();
      }, [setMessage, clearMessage]);

      return <>{message}</>;
    };
    render(<ReactTested />);
  });
});
