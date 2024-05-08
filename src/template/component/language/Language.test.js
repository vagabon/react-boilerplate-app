import { fireEvent, render, screen } from '@testing-library/react';
import Language from './Language';

describe('Language', () => {
  test('Given Language when its mount then Select is shown', () => {
    render(<Language />);
    expect(screen.getByTestId('Select')).toBeDefined();
  });

  test('Given Language when its mount then Select is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { language: 'fr' },
      }),
    );
    const mockChangeLanguage = jest.fn();
    const i18n = { changeLanguage: mockChangeLanguage };
    render(<Language i18n={i18n} hidden={false} />);
    expect(screen.getByTestId('Select')).toBeDefined();
    fireEvent.change(screen.getByTestId('Select'), { target: { value: 'en' } });
    expect(mockChangeLanguage).toBeCalled();
  });
});
