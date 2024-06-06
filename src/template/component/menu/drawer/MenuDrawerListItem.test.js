import { render, screen } from '@testing-library/react';
import { MenuDrawerListItem } from './MenuDrawerListItem';

describe('MenuDrawerListItem', () => {
  test('renders MenuDrawerListItem', () => {
    render(<MenuDrawerListItem></MenuDrawerListItem>);
    expect(screen.getByTestId('MdListItem')).toBeDefined();
  });
});
