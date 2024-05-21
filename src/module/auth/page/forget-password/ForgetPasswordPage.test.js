import { fireEvent, render, screen } from '@testing-library/react';
import { AuthService } from '../../service/AuthService';
import { ForgetPasswordPage } from './ForgetPasswordPage';

jest.mock('../../../../app/form/component/AppForm', () => ({
  AppForm: ({ onSubmit, children }) => (
    <div data-testid='AppForm' onClick={onSubmit}>
      {children()}
    </div>
  ),
}));

describe('ForgetPasswordPage', () => {
  test('Given ForgetPasswordPage when its mount then ', async () => {
    const mockCreateIdentityToken = jest.spyOn(AuthService, 'createIdentityToken').mockReturnValue(Promise.resolve({}));

    await render(<ForgetPasswordPage />);

    expect(screen.getByText(/AUTH:FORGET_PASSWORD.TITLE/)).toBeDefined();
    fireEvent.click(screen.getByTestId('AppForm'));
    expect(mockCreateIdentityToken).toBeCalledTimes(1);
  });
});
