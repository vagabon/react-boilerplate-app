import { render, screen } from '@testing-library/react';
import NewsCardSmall from './NewsCardSmall';

describe('NewsCardSmall', () => {
  test('Given NewsCardSmall when its mount then CardContent is shown', () => {
    const news = {
      id: 1,
      title: 'title',
      avatar: 'avatar',
      image: 'imamge',
      description: 'description',
      date: '2023-12-28T15:30:22',
    };
    render(<NewsCardSmall news={news} />);
    expect(screen.getByTestId('MdCard')).toBeDefined();
  });
});
