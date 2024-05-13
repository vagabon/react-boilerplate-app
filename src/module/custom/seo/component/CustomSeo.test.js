import { render, screen } from '@testing-library/react';
import { CustomSeo } from './CustomSeo';

describe('CustomSeo', () => {
  test('Given CustomSeo when is mount with an id Then ', async () => {
    render(<CustomSeo image='image' />);
    expect(screen.getByTestId('Helmet')).toBeDefined();
  });
});
