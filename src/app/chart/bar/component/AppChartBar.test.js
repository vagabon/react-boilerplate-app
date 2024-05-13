import { render, screen } from '@testing-library/react';
import { AppChartBar } from './AppChartBar';

describe('AppChartBar', () => {
  test('Given AppChartBar when its mount then MdCard is shown', () => {
    const charts = [
      {
        day: '17/02',
        nb: 5,
      },
    ];
    render(<AppChartBar charts={charts} generateCallback={jest.fn()} />);
    expect(screen.getByTestId('MdCard')).toBeDefined();
  });
});
