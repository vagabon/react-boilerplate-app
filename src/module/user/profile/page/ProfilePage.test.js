import { render, screen, waitFor } from '@testing-library/react';
import { UserService } from '../../user/service/UserService';
import { ProfilePage } from './ProfilePage';

describe('ProfilePage', () => {
  test('Given ProfilePage when its mount then CardContent is shown', () => {
    const mockUser = { id: '1', username: 'username', email: 'email', profiles: [{ id: 1, name: 'ADMIN' }] };
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: {
          user: { user: mockUser },
        },
        common: { history: [], language: 'fr' },
      }),
    );

    const profileReact = (id) => {
      return <>{id}</>;
    };

    jest.spyOn(UserService, 'fetchById').mockReturnValue(Promise.resolve(mockUser));
    render(
      <ProfilePage
        apiUrl='https://example.com'
        profileReact={profileReact}
        i18n={{
          changeLanguage: jest.fn(),
        }}
      />,
    );
    waitFor(() => {
      expect(screen.getAllByTestId('CardContent')).toBeDefined();
    });
  });

  test('Given ProfilePage when its mount then CardContent is not shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({ auth: { user: null }, common: { message: '', history: [] } }),
    );
    jest.spyOn(UserService, 'fetchById').mockReturnValue(Promise.resolve({}));
    render(<ProfilePage apiUrl='https://example.com' profileReact={() => <></>} />);
    expect(screen.queryByTestId(/CardContent/)).toBeNull();
  });
});
