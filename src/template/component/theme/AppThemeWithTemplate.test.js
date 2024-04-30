import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { palette } from './AppTheme.test';
import AppThemeWithTemplate from './AppThemeWithTemplate';

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

describe('AppThemeWithTemplate', () => {
  test('renders AppThemeWithTemplate', () => {
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
        <AppThemeWithTemplate
          palette={palette}
          menu={menu}
          apiUrl='apiUrl'
          title='title'
          image='image'
          email='email'
          links={[{ label: 'label', url: 'url' }]}
        />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('MdThemeProvider')).toBeDefined();
  });
});
