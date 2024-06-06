import { render, screen } from '@testing-library/react';
import { ToolbarTheme } from './ToolbarTheme';

describe('ToolbarTheme', () => {
  test('renders ToolbarTheme', () => {
    render(<ToolbarTheme></ToolbarTheme>);
    expect(screen.getByTestId('IconClickable')).toBeDefined();
  });
});
