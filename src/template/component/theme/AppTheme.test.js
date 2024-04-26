import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppTheme from './AppTheme';

export const palette = {
  primary: '$primary',
  secondary: '$secondary',
  info: '$info',
  success: '$success',
  error: '$error',
  'primary-dark': '$primary-dark',
  'secondary-dark': '$secondary-dark',
  'info-dark': '$info-dark',
  'success-dark': '$success-dark',
  'error-dark': '$error-dark',
  google: '$google',
  facebook: '$facebook',
};

describe('AppTheme', () => {
  test('renders AppTheme', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { loading: false, history: [], message: { id: '', message: '', type: 'success' } },
        auth: { isLoggedIn: false },
        notification: { nbNotification: 0, datas: [] },
      }),
    );
    Element.prototype.scrollTo = () => {};
    render(
      <BrowserRouter>
        <AppTheme palette={palette}>{() => <></>}</AppTheme>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('MdThemeProvider')).toBeDefined();
  });
});
