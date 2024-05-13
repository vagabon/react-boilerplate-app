import { render } from '@testing-library/react';
import { ShowMessage } from './ShowMessage';

jest.useFakeTimers();

describe('ShowMessage', () => {
  test('Given ShowMessage when its mount then Table is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { id: '1', message: { id: 1, message: 'message', type: 'error' } },
      }),
    );
    render(<ShowMessage />);
    jest.runAllTimers();
    expect(global.mockEnqueueSnackbar).toBeCalled();
  });
});
