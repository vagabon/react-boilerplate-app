import { render, screen } from '@testing-library/react';
import { AppChartPie } from './AppChartPie';

describe('AppChartPie', () => {
  test('Given AppChartPie when its mount then MdCard is shown', () => {
    const custumList = [
      {
        entity: { id: 1 },
        chip: 5,
        name: 'name',
      },
    ];
    render(<AppChartPie custumList={custumList} />);
    expect(screen.getByTestId('MdCard')).toBeDefined();
  });
});
