import { fireEvent, render, screen } from '@testing-library/react';
import { SnackbarProvider } from './SnackbarProvider';

jest.useFakeTimers();

describe('SnackbarProvider', () => {
  test('Given SnackbarProvider when its mount then Table is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { id: '', message: '', type: 'success' } },
      }),
    );

    render(<SnackbarProvider SnackbarProvider={[{ roles: [], title: 'title', link: 'link' }]} />);
    expect(screen.getByTestId('SnackbarProvider')).toBeDefined();
    fireEvent.click(screen.getByTestId('SnackbarProvider'));
  });
});
