import { fireEvent, render, screen } from '@testing-library/react';
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  test('Given RegisterPage when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { history: {} },
        auth: { user: null, isLoggedIn: false },
      }),
    );
    const { container } = render(<RegisterPage />);
    expect(screen.getByText(/AUTH:REGISTER.TITLE/)).toBeDefined();
    fireEvent.change(container.querySelector(`input[name="username"]`), { target: { value: 'login' } });
    fireEvent.change(container.querySelector(`input[name="email"]`), { target: { value: 'test@gmail.com' } });
    fireEvent.change(container.querySelector(`input[name="password"]`), { target: { value: 'password' } });
    fireEvent.change(container.querySelector(`input[name="password2"]`), { target: { value: 'password' } });
    fireEvent.click(screen.getAllByRole('button')[0]);
  });
});
