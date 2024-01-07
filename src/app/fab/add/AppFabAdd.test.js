import { render, screen } from '@testing-library/react';
import AppFabAdd from './AppFabAdd';

describe('AppFabAdd', () => {
  test('Given AppFabAdd when its mount then ButtonGroup is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
      }),
    );
    render(<AppFabAdd urlAdd='urlAdd' urlAddRole={['ADMIN']} />);
    expect(screen.getByTestId('MdFab')).toBeDefined();
  });
});
