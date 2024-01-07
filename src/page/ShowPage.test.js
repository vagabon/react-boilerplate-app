import { render, screen } from '@testing-library/react';
import ShowPage from './ShowPage';

describe('ShowPage', () => {
  test('Given ShowPage when its mount then ButtonGroup is shown', () => {
    const fetchData = jest.fn();
    render(
      <ShowPage data={{ id: 1 }} fetchData={fetchData}>
        Content
      </ShowPage>,
    );
    expect(screen.getByText(/Content/)).toBeDefined();
  });
});
