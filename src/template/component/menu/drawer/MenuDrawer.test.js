import { render, screen } from '@testing-library/react';
import { MenuDrawer } from './MenuDrawer';

describe('MenuDrawer', () => {
  test('renders MenuDrawer', () => {
    render(
      <MenuDrawer
        menu={[
          {
            title: 'ACCOUNT',
            link: '/auth/signin',
            base: '/auth',
            icon: 'avatar',
            roles: [],
            notConnected: true,
            childrens: [
              {
                title: 'ACCOUNT_SIGNIN',
                link: '/auth/signin',
                icon: 'login',
                roles: [],
              },
            ],
          },
        ]}
        showLanguage={true}></MenuDrawer>,
    );
    expect(screen.getByTestId('MdDrawer')).toBeDefined();
  });
});
