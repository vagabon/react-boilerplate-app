import { render, screen } from '@testing-library/react';
import AppTheme from './AppTheme';

const palette = {
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

const conf = {
  LOGO: '/images/logo.png',
  FOOTER: {
    URL: '/',
    WEBSITE: 'blog.vagabond.org',
    TARGET: '',
  },
};

const menu = [
  {
    title: 'Accueil',
    link: '/home',
    roles: [],
  },
  {
    title: 'Blog',
    link: '/blog',
    roles: [],
  },
  {
    title: 'Todolist',
    link: '/todolist',
    roles: [],
  },
  {
    title: 'Administration',
    link: '/admin',
    roles: ['ADMIN'],
    childrens: [
      {
        title: 'Utilisateurs',
        link: '/admin/tab/user',
        roles: [],
      },
      {
        title: 'Profiles',
        link: '/admin/tab/profile',
        roles: [],
      },
      {
        title: 'News',
        link: '/admin/tab/news',
        roles: [],
      },
    ],
  },
];

describe('AppTheme', () => {
  test('renders AppTheme', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { loading: false, history: [], message: { id: '', message: '', type: 'success' } },
        auth: { isLoggedIn: false },
      }),
    );
    Element.prototype.scrollTo = () => {};
    render(<AppTheme palette={palette} conf={conf} menu={menu} />);
    expect(screen.getByTestId('MdThemeProvider')).toBeDefined();
  });
});
