global.mockedUsedNavigate = jest.fn();
global.mockParams = { id: 0 };
global.mockLocation = { pathname: 'home' };
global.mockNavigate = jest.fn();
global.currentUser = undefined;
global.mockWithChildren = (name, { children }) => <div data-testid={name}>{children}</div>;

const mockT = (value) => value;

const mockBoilerPlateMd = {
  Icon: ({ icon }) => <div data-testid='Icon'>{icon}</div>,
  IconClickable: ({ callback }) => <div data-testid='IconClickable' onClick={callback}></div>,

  useIcon: () => ({
    getIcon: jest.fn(),
    getIconListDto: () => [{ id: 'icon', libelle: 'libelle', icon: 'icon' }],
  }),

  MdAccordion: ({ title, description }) => (
    <div data-testid='MdAccordion'>
      {title}
      <div data-testid='MdAccordionDescription'>{description}</div>
    </div>
  ),
  MdAlert: ({ label }) => <div data-testid='MdAlert'>{label}</div>,
  MdAppBar: (props) => mockWithChildren('MdAppBar', props),
  MdAvatar: ({ callback }) => <div data-testid='MdAvatar' onClick={callback}></div>,
  MdBackdrop: ({ children }) => <div data-testid='MdBackdrop'>{children}</div>,
  MdBadge: ({ children }) => <div data-testid='MdBadge'>{children}</div>,
  MdCollapse: ({ children }) => <div data-testid='MdCollapse'>{children}</div>,
  MdChip: ({ callbackDelete }) => <button data-testid='MdChip' onClick={callbackDelete}></button>,
  MdBox: (props) => mockWithChildren('MdBox', props),
  MdBouttonGroup: (props) => mockWithChildren('MdBouttonGroup', props),
  MdButton: ({ callback }) => <button data-testid='MdButton' onClick={callback}></button>,
  MdCard: ({ className, title, titleIconLeft, callbackLeft, children, elementRigth, actions }) => (
    <div data-testid='MdCard' className={className}>
      <div data-testid='MdCardHeader' onClick={titleIconLeft}>
        {title}
      </div>
      <div data-testid='MdCardLeft' onClick={callbackLeft}></div>
      <div>{elementRigth?.()}</div>
      <div>{actions}</div>
      <div>{children}</div>
    </div>
  ),
  MdCardMedia: (props) => mockWithChildren('MdCardMedia', props),
  MdContent: (props) => mockWithChildren('MdContent', props),
  MdContainer: (props) => mockWithChildren('MdContainer', props),
  MdDrawer: (props) => mockWithChildren('MdDrawer', props),
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
  MdFormSwitch: ({ name, onChange }) => (
    <input data-testid='MdFormSwitch' name={name} defaultValue={true} onChange={onChange} />
  ),
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
      defaultValue={value}
      onChange={handleChange ? handleChange : () => {}}
      onBlur={handleBlur}
      onKeyUp={() => handleKeyEnter({ value: value })}
    />
  ),

  MdGrid: (props) => mockWithChildren('MdGrid', props),

  MdModal: ({ handleClose, children }) => (
    <div data-testid='MdModal' onClick={handleClose}>
      {children}
    </div>
  ),
  MdList: (props) => mockWithChildren('MdList', props),
  MdListSimple: ({ title, items }) => (
    <ul data-testid='MdListSimple'>
      {title}
      {items.map((item) => (
        <li key={item.label}>{item.label}</li>
      ))}
    </ul>
  ),
  MdListItem: ({ callback, children }) => (
    <div data-testid='MdListItem' onClick={callback}>
      {children}
    </div>
  ),
  MdListItemAvatar: (props) => mockWithChildren('MdListItemAvatar', props),
  MdListItemButton: (props) => mockWithChildren('MdListItemButton', props),
  MdListItemIcon: (props) => mockWithChildren('MdListItemIcon', props),
  MdListItemText: ({ onClick, children }) => (
    <div data-testid='MdListItemText' onClick={onClick}>
      {children}
    </div>
  ),
  MdCircularProgress: (props) => mockWithChildren('MdCircularProgress', props),
  MdLinearProgress: (props) => mockWithChildren('MdLinearProgress', props),

  MdLink: (props) => mockWithChildren('MdLink', props),
  MdMarkdown: ({ summaryCallback, content }) => (
    <div data-testid='MdMarkdown'>
      {summaryCallback?.('newSummary')}
      {content}
    </div>
  ),
  MdMenuProvider: ({ elements }) => (
    <div data-testid='MdMenuProvider'>
      {elements.map((element) => (
        <div>{element.element()}</div>
      ))}
    </div>
  ),
  MdMenu: ({ children }) => <div data-testid='MdMenu'>{children}</div>,
  MdMenuItem: (props) => mockWithChildren('MdMenuItem', props),
  MdMenuProviderItem: (props) => mockWithChildren('MdMenuProviderItem', props),
  MdSearchBar: ({ callback }) => <div data-testid='MdSearchBar' onClick={callback}></div>,
  MdSnackbar: (props) => mockWithChildren('MdSnackbar', props),
  MdSkeleton: (props) => mockWithChildren('MdSkeleton', props),
  MdThemeProvider: (props) => mockWithChildren('MdThemeProvider', props),
  MdTabs: ({ callback }) => <div data-testid='MdTabs' onClick={callback}></div>,
  MdToolbar: (props) => mockWithChildren('MdToolbar', props),
  MdTreeView: ({ callback, children }) => (
    <div data-testid='MdTreeView' onClick={callback}>
      {children}
    </div>
  ),
  MdTypo: (props) => mockWithChildren('MdTypo', props),

  MdTable: (props) => mockWithChildren('MdTable', props),
  MdTableWithPagination: (props) => mockWithChildren('MdTableWithPagination', props),

  MdTooltip: (props) => mockWithChildren('MdTooltip', props),

  useMenu: () => ({ anchorEl: null, open: false, handleClick: jest.fn(), handleClose: jest.fn() }),
  useFormError: () => ({ error: '' }),
  useAppTranslate: () => ({
    t: mockT,
    Trans: ({ i18nKey }) => <span data-testid='Trans'>{i18nKey}</span>,
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
    handleNavigate: () => global.mockNavigate,
    handleNavigateWithId: () => jest.fn(),
  }),
  useId: () => ({ id: 1 }),
  useTab: () => ({
    tabs: [],
    handleChangeTab: jest.fn(),
    updateTab: (callback) => {
      callback({ name: 'name' });
    },
  }),
  useTheme: () => ({
    mode: 'dark',
    theme: {},
    switchTheme: jest.fn(),
  }),

  ThemeContextProvider: (props) => mockWithChildren('ThemeContextProvider', props),
  Translate: ({ i18nKey }) => <span data-testid='Translate'>{i18nKey}</span>,
  useThemeContent: () => ({
    mode: 'dark',
    switchTheme: jest.fn(() => {}),
  }),

  RouterProvider: (props) => mockWithChildren('RouterProvider', props),
  useTranslate: () => ({
    translate: mockT,
  }),

  DateUtils: {
    format: (data, format) => data,
    showEndDate: () => ({ days: 1, hours: 2, minutes: 3 }),
    isDateSupNow: () => true,
  },
  I18nUtils: {
    translate: (t, label) => label,
  },
  ObjectUtils: {
    capitalize: (data) => data,
    toLowerCase: (data) => data.toLowerCase(),
    toUpperCase: (data) => data.toUpperCase(),
    toNumberFormat: (data) => data,
    toNumberShot: (data) => data,
    getDtoValue: (data, name) => data?.[name] ?? '',
    getDtoString: (data, name) => data?.[name] ?? '',
    getRecursivValue: (data, name) => data?.[name],
    compareId: () => true,
    addOrReplace: () => [{ id: 1 }],
  },
  UuidUtils: {
    createUUID: () => 'uuid',
  },
};

module.exports = mockBoilerPlateMd;
