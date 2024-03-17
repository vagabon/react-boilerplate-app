import { fireEvent, render, screen } from '@testing-library/react';
import NotificationPage from '../page/NotificationPage';

describe('NotificationPage', () => {
  test('Given NotificationPage when its mount then AppContent is shown', async () => {
    document.getElementById = jest.fn().mockReturnValue({
      scrollTo: jest.fn(),
    });
    jest.spyOn(window, 'scroll').mockImplementation(() => {});
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: { message: 'text', type: 'success' } },
        auth: { user: { user: { id: 1, profiles: [{ name: 'USER', roles: 'USER' }] } } },
        notification: { nbNotification: 0, datas: [], page: 0 },
      }),
    );
    const mockCallback = jest.fn();
    render(<NotificationPage handleSelect={mockCallback} />);
    expect(screen.getByTestId('Helmet')).toBeDefined();
    screen.getAllByTestId('MdButton').forEach((button) => {
      fireEvent.click(button);
    });
    expect(mockCallback).toBeCalled();
  });
});
