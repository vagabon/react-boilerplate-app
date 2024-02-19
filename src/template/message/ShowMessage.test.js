import { render } from '@testing-library/react';
import ShowMessage from './ShowMessage';

describe('ShowMessage', () => {
  test('Given ShowMessage when its mount then Table is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { id: '1', message: 'message', type: 'error' },
      }),
    );
    render(<ShowMessage />);
    // TODO : add an assertion there
  });
});
