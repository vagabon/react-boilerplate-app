import { render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  test('Given ContactPage when its mount then Helmet is shown', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('Helmet')).toBeDefined();
  });
});
