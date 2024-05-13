import { fireEvent, render, screen } from '@testing-library/react';
import { AuthService } from '../../service/AuthService';
import { CheckIdentityPage } from './CheckIdentityPage';

jest.mock('../../../../app/formik/AppFormik', () => ({
  AppFormik: ({ onSubmit, children }) => (
    <div data-testid='AppFormik' onClick={onSubmit}>
      {children()}
    </div>
  ),
}));

describe('CheckIdentityPage', () => {
  test('Given CheckIdentityPage when its mount then ', async () => {
    const mockCheckIdentityToken = jest
      .spyOn(AuthService, 'checkIdentityToken')
      .mockReturnValue(Promise.resolve({ token: 'token' }));
    jest.spyOn(AuthService, 'resetPassword').mockReturnValue(Promise.resolve({ token: 'token' }));

    await render(<CheckIdentityPage />);

    expect(screen.getByText(/AUTH:CHECK_IDENTITY.TITLE/)).toBeDefined();
    fireEvent.click(screen.getByTestId('AppFormik'));
    expect(mockCheckIdentityToken).toBeCalledTimes(1);
  });
});
