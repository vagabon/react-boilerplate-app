import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div data-testid='GOOGLE'>{children}</div>,
  useGoogleLogin: () => {
    return { onSuccess: jest.fn(), onError: jest.fn() };
  },
}));

describe('LoginPage', () => {
  test('Given LoginPage when its mount then ', () => {
    const { container } = render(<LoginPage />);
    expect(screen.getByText(/AUTH:LOGIN.TITLE/)).toBeDefined();
    fireEvent.change(container.querySelector(`input[name="username"]`), { target: { value: 'login' } });
    fireEvent.change(container.querySelector(`input[name="password"]`), { target: { value: 'password' } });
    fireEvent.click(screen.getAllByRole('button')[2]);
  });
});
