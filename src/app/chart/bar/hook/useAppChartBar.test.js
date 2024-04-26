import { renderHook } from '@testing-library/react';
import { useAppChartBar } from './useAppChartBar';

describe('useAppChartBar', () => {
  test('Given useAppChartBar When convertToChartBar  and getColors Then service is called', async () => {
    const { result } = renderHook(() => useAppChartBar());
    await result.current.convertToChartBar([{ title: 'title', nb: 'nb' }]);
    expect(result.current.axis.length).toBe(1);

    await result.current.getColors({ 'primary-dark': 'primary-dark' }, true);
    await result.current.getColors({ 'primary-dark': 'primary-dark' }, false);
  });
});
