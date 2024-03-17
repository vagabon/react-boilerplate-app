import { render, screen } from '@testing-library/react';
import AppPieBar from './AppPieBar';

describe('AppPieBar', () => {
  test('Given AppPieBar when its mount then MdCard is shown', () => {
    const custumList = [
      {
        entity: { id: 1 },
        chip: 5,
        name: 'name',
      },
    ];
    render(<AppPieBar custumList={custumList} />);
    expect(screen.getByTestId('MdCard')).toBeDefined();
  });
});
