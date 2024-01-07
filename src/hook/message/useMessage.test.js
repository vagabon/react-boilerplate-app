import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { useMessage } from './useMessage';

const menu = [];

describe('useMessage', () => {
  test('Given useMessage when location is / then dispatch is called', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { scrolls: [] } }));
    useAppDispatchSpy.mockReturnValue(mockDispatch);
    const ReactTested = () => {
      const { message, setMessage, setMessageButton, clearMessage } = useMessage(menu);

      useEffect(() => {
        setMessage('message');
        setMessageButton('message');
        clearMessage();
      }, [setMessage, setMessageButton, clearMessage]);

      return <>{message}</>;
    };
    render(<ReactTested />);
  });
});
