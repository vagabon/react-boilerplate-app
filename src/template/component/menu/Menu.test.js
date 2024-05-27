import { render, screen } from '@testing-library/react';
import { Menu } from './Menu';

jest.useFakeTimers();

describe('Menu', () => {
  test('Given Menu when its mount then Table is shown', () => {
    render(<Menu menu={[{ roles: [], title: 'title', link: 'link' }]} />);
    expect(screen.getByTestId('MdToolbar')).toBeDefined();
  });
});
