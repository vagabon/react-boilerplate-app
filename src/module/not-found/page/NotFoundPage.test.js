import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('Given NotFoundPage when its mount then MdCard is shown ', () => {
    render(<NotFoundPage />);
    expect(screen.getByTestId('MdCard')).toBeDefined();
  });
});
