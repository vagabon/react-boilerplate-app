import { render, screen } from '@testing-library/react';
import { NewsCard } from './NewsCard';

describe('NewsCard', () => {
  test('Given NewsCard when its mount then MdCard is shown', () => {
    const news = {
      id: 1,
      title: 'title',
      avatar: 'avatar',
      image: 'imamge',
      description: 'description',
      date: '2023-12-28T15:30:22',
      tags: 'tags1,tags2',
    };
    render(<NewsCard news={news} endPoint='news' integrations={[]} />);
    expect(screen.getAllByTestId('MdCard')).toBeDefined();
  });
});
