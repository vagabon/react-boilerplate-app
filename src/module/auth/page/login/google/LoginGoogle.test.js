import { fireEvent, render, screen } from '@testing-library/react';
import { AuthService } from '../../../service/AuthService';
import { LoginGoogle } from './LoginGoogle';

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div data-testid='GOOGLE'>{children}</div>,
  useGoogleLogin: ({ onSuccess }) => {
    return onSuccess;
  },
}));

describe('LoginGoogle', () => {
  test('Given LoginGoogle when its mount then ', () => {
    render(<LoginGoogle />);
    jest.spyOn(AuthService, 'googleConnect').mockReturnValue(Promise.resolve({}));
    expect(screen.getByTestId('MdButton')).toBeDefined();
    fireEvent.click(screen.getByTestId('MdButton'));
  });
});
