import { render, screen } from '@testing-library/react';
import AppButtonRefresh from './AppButtonRefresh';

describe('AppButtonRefresh', () => {
  test('Given AppButtonRefresh when its mount then MdButton is shown', () => {
    render(<AppButtonRefresh callback={jest.fn()} />);
    expect(screen.getByTestId('MdButton')).toBeDefined();
  });
});
