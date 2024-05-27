import { renderHook } from '@testing-library/react';
import { useTemplateScrollHandle } from './useTemplateScrollHandle';

describe('useTemplateScrollHandle', () => {
  test('Given useTemplateScrollHandle when is mount Then ', () => {
    const { result } = renderHook(() => useTemplateScrollHandle());

    result.current.handleScroll({}, '/home')();
  });
});
