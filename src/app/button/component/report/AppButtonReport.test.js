import { fireEvent, render, screen } from '@testing-library/react';
import { AppButtonReport } from './AppButtonReport';

describe('AppButtonReport', () => {
  test('Given AppButtonReport when its mount then MdButton is shown', () => {
    render(<AppButtonReport callback={jest.fn()} />);
    expect(screen.getByTestId('MdButton')).toBeDefined();
    fireEvent.click(screen.getByTestId('MdButton'));
  });
});
