import { render, screen } from '@testing-library/react';
import CustomChatboIframe from './CustomChatboIframe';

describe('CustomChatboIframe', () => {
  test('Given CustomChatboIframe when its mount then MdFab is shown', () => {
    render(<CustomChatboIframe showChatbot={true} iframeUrl='url' acceptCopy={true} callbackClose={() => {}} />);
    expect(screen.getAllByTestId('IconClickable').length).toBe(2);
  });
});
