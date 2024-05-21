import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { palette } from '../AppTheme.test';
import { AppThemeProvider } from './AppThemeProvider';

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

describe('AppThemeProvider', () => {
  test('renders AppThemeProvider', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: {
          loading: false,
          history: [],
          message: { id: '', message: '', type: 'success' },
          chatbot: { selected: '', show: true },
        },
        auth: { isLoggedIn: false },
        notification: { nbNotification: 0, datas: [] },
      }),
    );
    Element.prototype.scrollTo = () => {};
    render(
      <BrowserRouter>
        <AppThemeProvider
          palette={palette}
          menu={menu}
          apiUrl='apiUrl'
          title='title'
          image='image'
          email='email'
          links={[{ label: 'label', url: 'url' }]}
          showNotification={true}
          showLanguage={true}
        />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('ThemeContextProvider')).toBeDefined();
  });
});
