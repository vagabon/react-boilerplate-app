console.error = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  Link: mockComponentWithCallBack('Link'),
}));

/********************************* MOCK COMPONENT ********************************/

global.mockComponent =
  (props) =>
  ({ children }) => {
    return <div data-testid={props}>{children}</div>;
  };
global.mockComponentWithCallBack =
  (name) =>
  ({ onClick, children }) =>
    (
      <>
        <input data-testid={name} onClick={onClick} />
        {children}
      </>
    );

global.spyOn = (object, method, data) => {
  return jest.spyOn(object, method).mockReturnValue(Promise.resolve(data));
};

/********************************** MOCK REDUX ***********************************/

import * as redux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import store from './store/Store';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(() => Promise.resolve()),
}));
global.useSelectorSpy = jest.spyOn(redux, 'useSelector');

const middlewares = [];
global.mockStore = configureMockStore(middlewares)({});

global.dispatch = jest.fn();

jest.mock('./store/Store', () => ({
  useAppSelector: () => jest.fn(() => Promise.resolve()),
  useAppDispatch: () => jest.fn(() => Promise.resolve()),
}));
global.useAppSelectorSpy = jest.spyOn(store, 'useAppSelector');
global.useAppDispatchSpy = jest.spyOn(store, 'useAppDispatch');
global.mockDispatch = jest.fn();

/***************************** AFTER EACH RESET MOCK *****************************/

const mockWithChildren = (name, { children }) => <div data-testid={name}>{children}</div>;

global.mockedUsedNavigate = jest.fn();
global.mockParams = {};
global.mockLocation = { pathname: 'home' };

jest.mock('@vagabond-inc/react-boilerplate-md', () => ({
  IconClickable: ({ callback }) => <div data-testid='IconClickable' onClick={callback}></div>,

  useIcon: () => ({
    getIcon: jest.fn(),
  }),

  MdAvatar: ({ callback }) => <div data-testid='MdAvatar' onClick={callback}></div>,
  MdChip: ({ callbackDelete }) => <button data-testid='MdChip' onClick={callbackDelete}></button>,
  MdBox: (props) => mockWithChildren('MdBox', props),
  MdBouttonGroup: (props) => mockWithChildren('MdBouttonGroup', props),
  MdButton: ({ onClick }) => <button data-testid='MdButton' onClick={onClick}></button>,
  MdCard: ({ className, title, titleIconLeft, callbackLeft, children }) => (
    <div data-testid='MdCard' className={className}>
      <div data-testid='MdCardHeader' onClick={titleIconLeft}>
        {title}
      </div>
      <div data-testid='MdCardLeft' onClick={callbackLeft}></div>
      <div>{children}</div>
    </div>
  ),
  MdContent: (props) => mockWithChildren('MdContent', props),
  MdContainer: (props) => mockWithChildren('MdContainer', props),
  MdDivider: (props) => mockWithChildren('MdDivider', props),
  MdFab: ({ callback }) => <div data-testid='MdFab' onClick={callback}></div>,
  MdForm: ({ onSubmit, children }) => (
    <div data-testid='MdForm' onClick={onSubmit}>
      {children({ values: [], handleSubmit: jest.fn() })}
    </div>
  ),
  MdFormError: (props) => mockWithChildren('MdFormError', props),
  MdFormSelect: ({ name, list }) => (
    <select data-testid='MdFormSelect' name={name}>
      {list.map((item) => (
        <option key={item.id} value={item.id}>
          {item.libelle}
        </option>
      ))}
    </select>
  ),
  MdFormFile: () => <input data-testid='MdFormFile' />,
  MdFormSwitch: () => <input data-testid='MdFormSwitch' />,
  MdFormCheckbox: ({ name, value, handleChange }) => (
    <input data-testid='MdFormCheckbox' type='checkbox' name={name} value={value} onChange={handleChange} />
  ),
  MdInputDatepicker: () => <input data-testid='MdInputDatepicker' />,
  MdInputText: ({ name, handleChange }) => <input data-testid='MdInputText' name={name} onChange={handleChange} />,
  MdInputTextSimple: ({ name, value, handleChange }) => (
    <input data-testid='MdInputTextSimple' name={name} value={value} onChange={handleChange} />
  ),

  MdGrid: (props) => mockWithChildren('MdGrid', props),

  MdCommonModal: ({ handleClose, children }) => (
    <div data-testid='MdCommonModal' onClick={handleClose}>
      {children}
    </div>
  ),
  MdList: (props) => mockWithChildren('MdList', props),
  MdListItem: ({ callback, children }) => (
    <div data-testid='MdListItem' onClick={callback}>
      {children}
    </div>
  ),
  MdListItemAvatar: (props) => mockWithChildren('MdListItemAvatar', props),
  MdListItemButton: (props) => mockWithChildren('MdListItemButton', props),
  MdListItemIcon: (props) => mockWithChildren('MdListItemIcon', props),
  MdListItemText: (props) => mockWithChildren('MdListItemText', props),

  MdLinearProgress: (props) => mockWithChildren('MdLinearProgress', props),
  MdLink: (props) => mockWithChildren('MdLink', props),
  MdMarkdown: (props) => mockWithChildren('MdMarkdown', props),
  MdMenuItem: (props) => mockWithChildren('MdMenuItem', props),
  MdSearchBar: ({ callback }) => <div data-testid='MdSearchBar' onClick={callback}></div>,
  MdSnackbar: (props) => mockWithChildren('MdSnackbar', props),
  MdThemeProvider: (props) => mockWithChildren('MdThemeProvider', props),
  MdTabs: ({ callback }) => <div data-testid='MdTabs' onClick={callback}></div>,
  MdToolbar: (props) => mockWithChildren('MdToolbar', props),
  MdTypo: (props) => mockWithChildren('MdTypo', props),

  MdTableWithPagination: (props) => mockWithChildren('MdTableWithPagination', props),

  useFormError: () => ({ error: '' }),
  useAppTranslate: () => ({
    t: (label) => label,
  }),
  useAppRouter: () => ({
    navigate: global.mockedUsedNavigate,
    params: global.mockParams,
    location: global.mockLocation,
  }),
  useId: () => ({ id: 1 }),
  useTheme: () => ({
    mode: 'dark',
    theme: {},
    switchTheme: jest.fn(),
  }),

  i18n: jest.fn(),
  LanguageDetector: jest.fn(),
  Trans: jest.fn(),
  initReactI18next: jest.fn(),

  I18nUtils: {
    translate: (t, label) => label,
  },
  ObjectUtils: {
    capitalize: jest.fn(),
    getDtoString: (data, name) => data[name],
  },
  UuidUtils: {
    createUUID: () => 'uuid',
  },
  WindowUtils: {
    getEnv: () => 'http://localhost:8090',
  },
}));

/***************************** AFTER EACH RESET MOCK *****************************/

beforeEach(() => {});

afterEach(() => {
  jest.resetAllMocks();
});

/********************************** LOCAL STORAGE *********************************/

const localStorageMock = (function () {
  let storageMock = {};
  return {
    getItem: (key) => storageMock[key],
    setItem: (key, value) => (storageMock[key] = value),
    clear: () => (storageMock = {}),
    removeItem: (key) => delete storageMock[key],
    getAll: () => storageMock,
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

global.localStorageMock = localStorageMock;

global.setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

window.ENV = {
  API_URL: 'http://localhost:8090',
};
window.scrollTo = jest.fn();
window.matchMedia = jest.fn().mockReturnValue({ matches: '' });
