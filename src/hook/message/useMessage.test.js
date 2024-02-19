import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { useMessage } from './useMessage';

const menu = [];

describe('useMessage', () => {
  test('Given useMessage when location is / then dispatch is called', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { scrolls: [] } }));
    useAppDispatchSpy.mockReturnValue(mockDispatch);
    const ReactTested = () => {
      const { message, setMessage, clearMessage } = useMessage(menu);

      useEffect(() => {
        setMessage('message');
        clearMessage();
      }, [setMessage, clearMessage]);

      return <>{message}</>;
    };
    render(<ReactTested />);
  });
});
