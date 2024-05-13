import { render } from '@testing-library/react';
import { AppContent } from './AppContent';

describe('AppContent', () => {
  test('Given AppContent when its mount then ButtonGroup is shown', () => {
    const { container } = render(<AppContent>Content</AppContent>);
    expect(container.getElementsByClassName('max-width')[0]).toBeDefined();
  });
});
