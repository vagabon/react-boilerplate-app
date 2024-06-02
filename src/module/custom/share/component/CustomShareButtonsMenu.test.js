import { render, screen } from '@testing-library/react';
import { CustomShareButtonsMenu } from './CustomShareButtonsMenu';

describe('CustomShareButtonsMenu', () => {
  test('Given CustomShareButtonsMenu when its mount with no data then list is empty', () => {
    render(<CustomShareButtonsMenu url='url' />);
    expect(screen.getByTestId('MdMenuProvider')).toBeDefined();
  });
});
