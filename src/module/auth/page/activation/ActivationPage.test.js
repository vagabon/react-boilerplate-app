import { render, screen } from '@testing-library/react';
import ActivationPage from './ActivationPage';

describe('ActivationPage', () => {
  test('Given ActivationPage when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: '' },
      }),
    );
    render(<ActivationPage />);
    expect(screen.getByText(/AUTH:ACTIVATION.TITLE/)).toBeDefined();
  });
});
