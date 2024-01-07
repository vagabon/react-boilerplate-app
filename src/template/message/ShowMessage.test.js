import { render, screen } from '@testing-library/react';
import ShowMessage from './ShowMessage';

describe('ShowMessage', () => {
  test('Given ShowMessage when its mount then Table is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: 'message', type: 'error' },
      }),
    );
    render(<ShowMessage />);
    expect(screen.getByTestId('MdSnackbar')).toBeDefined();
  });
});
