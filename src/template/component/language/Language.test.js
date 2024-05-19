import { fireEvent, render, screen } from '@testing-library/react';
import { Language } from './Language';

describe('Language', () => {
  test('Given Language when its mount then Select is shown', () => {
    render(<Language show={true} />);
    expect(screen.getByTestId('Select')).toBeDefined();
  });

  test('Given Language when its mount then Select is shown', () => {
    render(<Language show hidden={true} />);
    expect(screen.getByTestId('Select')).toBeDefined();
    fireEvent.change(screen.getByTestId('Select'), { target: { value: 'en' } });
  });
});
