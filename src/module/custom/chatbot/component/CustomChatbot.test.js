import { render, screen } from '@testing-library/react';
import CustomChatbot from './CustomChatbot';

describe('CustomChatbot', () => {
  test('Given CustomChatbot when its mount then MdFab is shown', () => {
    render(<CustomChatbot iframeUrl='iframeUrl' />);
    expect(screen.getByTestId('MdFab')).toBeDefined();
  });
});
