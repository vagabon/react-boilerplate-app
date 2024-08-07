import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RegisterPage } from './RegisterPage';

jest.mock('../../../../app/form/component/AppForm', () => ({
  AppForm: ({ onSubmit, children }) => (
    <div
      data-testid='AppForm'
      onClick={() =>
        onSubmit({
          accept: true,
          username: 'username',
          email: 'email',
          password: 'password',
        })
      }>
      {children()}
    </div>
  ),
}));

describe('RegisterPage', () => {
  test('Given RegisterPage when its mount then ', () => {
    jest.spyOn(React, 'useRef').mockImplementation(() => ({
      current: {
        getValue: () => 'token',
      },
    }));
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
    fireEvent.change(container.querySelector(`input[name="accept"]`), { target: { value: true } });
    fireEvent.click(screen.getAllByTestId('AppForm')[0]);
  });
});
