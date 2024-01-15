/********************************** LOCAL STORAGE *********************************/

console.debug = jest.fn();

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
    removeItem: (key) => delete store[key],
    getAll: () => store,
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

global.localStorageMock = localStorageMock;

global.setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

/********************************* MOCK COMPONENT ********************************/

global.mockWithChildren = (name, { children }) => <div data-testid={name}>{children}</div>;
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

global.mockedUsedNavigate = jest.fn();
global.mockParams = {};
global.mockLocation = { pathname: 'home' };

export const mockBoilerPlateMd = {
  IconClickable: ({ callback }) => <div data-testid='IconClickable' onClick={callback}></div>,

  useIcon: () => ({
    getIcon: jest.fn(),
  }),

  MdAvatar: ({ callback }) => <div data-testid='MdAvatar' onClick={callback}></div>,
  MdChip: ({ callbackDelete }) => <button data-testid='MdChip' onClick={callbackDelete}></button>,
  MdBox: (props) => mockWithChildren('MdBox', props),
  MdBouttonGroup: (props) => mockWithChildren('MdBouttonGroup', props),
  MdButton: ({ callback }) => <button data-testid='MdButton' onClick={callback}></button>,
  MdCard: ({ className, title, titleIconLeft, callbackLeft, children, elementRigth }) => (
    <div data-testid='MdCard' className={className}>
      <div data-testid='MdCardHeader' onClick={titleIconLeft}>
        {title}
      </div>
      <div data-testid='MdCardLeft' onClick={callbackLeft}></div>
      <div>{elementRigth && elementRigth?.()}</div>
      <div>{children}</div>
    </div>
  ),
  MdCardMedia: (props) => mockWithChildren('MdCardMedia', props),
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
  MdFormCheckboxSimple: ({ name, value, callbackClick }) => (
    <input data-testid='MdFormCheckboxSimple' type='checkbox' name={name} value={value} onClick={callbackClick} />
  ),
  MdInputDatepicker: () => <input data-testid='MdInputDatepicker' />,
  MdInputText: ({ name, handleChange }) => <input data-testid='MdInputText' name={name} onChange={handleChange} />,
  MdInputTextSimple: ({ name, value, handleChange, handleBlur, handleKeyEnter }) => (
    <input
      data-testid='MdInputTextSimple'
      name={name}
      value={value}
      onChange={handleChange ? handleChange : () => {}}
      onBlur={handleBlur}
      onKeyUp={handleKeyEnter}
    />
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
    Trans: ({ i18nKey }) => <div data-testid='Trans'>{i18nKey}</div>,
    i18n: jest.fn(),
    LanguageDetector: jest.fn(),
    initReactI18next: jest.fn(),
  }),
  useAppRouter: () => ({
    navigate: global.mockedUsedNavigate,
    params: global.mockParams,
    location: global.mockLocation,
    Link: (props) => mockWithChildren('MdLink', props),
    Navigate: jest.fn(),
    BrowserRouter: (props) => mockWithChildren('BrowserRouter', props),
    Route: (props) => mockWithChildren('Route', props),
    Routes: (props) => mockWithChildren('Routes', props),
  }),
  useId: () => ({ id: 1 }),
  useTheme: () => ({
    mode: 'dark',
    theme: {},
    switchTheme: jest.fn(),
  }),

  DateUtils: {
    format: (data, format) => data,
  },
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
};

/***************************** AFTER EACH RESET MOCK *****************************/

afterEach(() => {
  jest.resetAllMocks();
});
