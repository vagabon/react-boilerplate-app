import { render } from '@testing-library/react';
import { Snackbar } from './Snackbar';

jest.useFakeTimers();

describe('Snackbar', () => {
  test('Given Snackbar when its mount then Table is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { id: '1', message: { id: 1, message: 'message', type: 'error' } },
      }),
    );
    render(<Snackbar />);
    jest.runAllTimers();
    expect(global.mockEnqueueSnackbar).toBeCalled();
  });
});
