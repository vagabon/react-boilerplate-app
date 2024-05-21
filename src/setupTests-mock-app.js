global.firstRender = false;
const mockDatas = [];
global.mockWithChildren = (name, { children }) => <div data-testid={name}>{children}</div>;

const mocks = {
  StorageUtils: {
    getCurrentUser: () => global.currentUser,
    setCurrentUser: jest.fn(),
    validateConsent: () => true,
  },
  useAppChartBar: () => ({
    getColors: jest.fn(),
  }),
  AppChartBar: ({ generateCallback }) => <div data-testid='AppChartBar' onClick={generateCallback} aria-hidden></div>,
  AppChartPie: () => <div data-testid='AppChartPie'></div>,
  AppForm: ({ onSubmit, children }) => (
    <div data-testid='AppForm' onClick={onSubmit} aria-hidden>
      {children({ values: [], handleSubmit: jest.fn(), setFieldValue: jest.fn() })}
    </div>
  ),
  AppButtonRefresh: ({ callback }) => <div data-testid='AppButtonRefresh' onClick={callback} aria-hidden></div>,
  AppButtonReport: ({ callback }) => <div data-testid='AppButtonReport' onClick={callback} aria-hidden></div>,
  AppContent: (props) => global.mockWithChildren('AppContent', props),
  AppFabAdd: ({ callback }) => <div data-testid='AppFabAdd' onClick={callback} aria-hidden></div>,
  AppInfiniteScrool: ({ children }) => <div data-testid='AppInfiniteScrool'>{children}</div>,
  ShowMessage: () => global.mockWithSimple('ShowMessage'),
  NewsList: (props) => global.mockWithChildren('NewsList', props),

  HasRole: (props) => global.mockWithChildren('HasRole', props),
  AdminRouter: () => <></>,
  AuthRouter: () => <></>,
  NewsRouter: () => <></>,
  UserRouter: () => <></>,
  NotificationRouter: () => <></>,
  AppInfiniteScrollProvider: ({ doChangePage, doSearch, children }) => (
    <div data-testid='AppInfiniteScrollProvider' onClick={doChangePage} aria-hidden>
      <div data-testid='AppInfiniteScrollProviderSearch' onClick={doSearch} aria-hidden>
        {children}
      </div>
    </div>
  ),

  CustomChatbot: () => <div data-testid='CustomChatbot'></div>,
  CustomFile: () => <div data-testid='CustomFile'></div>,
  CustomForm: ({ handleUpdate }) => <div data-testid='CustomForm' onClick={handleUpdate} aria-hidden></div>,
  CustomList: ({ buttonChildren, callback, callbackAvatar, callbackDelete, callbackSettings, callbackCheckbox }) => (
    <div data-testid='CustomList' onClick={callback} aria-hidden>
      <div data-testid='CustomListButton'>{buttonChildren?.('1')}</div>
      <div data-testid='CustomListDelete' onClick={callbackDelete} aria-hidden></div>
      <div data-testid='CustomListAvatar' onClick={callbackAvatar?.({ id: 1 })} aria-hidden></div>
      <div data-testid='CustomListSettings' onClick={callbackSettings} aria-hidden></div>
      <div data-testid='CustomListCheckbox' onClick={() => callbackCheckbox(1, true)} aria-hidden></div>
    </div>
  ),
  CustomModale: ({ callback, children }) => (
    <div data-testid='CustomModale' onClick={callback} aria-hidden>
      {children({ closeModale: () => {} })}
    </div>
  ),
  CustomModaleCard: ({ callback, children }) => (
    <div data-testid='CustomModaleCard' onClick={callback} aria-hidden>
      {children()}
    </div>
  ),
  CustomModaleConfirm: ({ callback, children }) => (
    <div data-testid='CustomModaleConfirm' onClick={callback} aria-hidden>
      {children?.()}
    </div>
  ),
  CustomModaleForm: ({ callback, children }) => (
    <div data-testid='CustomModaleForm' onClick={callback} aria-hidden>
      {children()}
    </div>
  ),
  NotificationSearch: () => <div data-testid='NotificationSearch'></div>,
  CustomShareButtons: () => <div data-testid='CustomShareButtons'></div>,
  CustomShareButtonsMenu: () => <div data-testid='CustomShareButtonsMenu'></div>,
  CustomSeo: () => <div data-testid='CustomSeo'></div>,

  NewsCard: ({ children }) => <div data-testid='NewsCard'>{children}</div>,
  NewsCardSmall: ({ children }) => <div data-testid='NewsCardSmall'>{children}</div>,

  SuspenceLoader: ({ children }) => <div data-testid='SuspenceLoader'>{children}</div>,

  ContactPage: ({ children }) => <div data-testid='ContactPage'>{children}</div>,
  ProfilePage: ({ children }) => <div data-testid='ProfilePage'>{children}</div>,
  ProfileShow: ({ children }) => <div data-testid='ProfileShow'>{children}</div>,
  ProfileService: {},
  UserService: {},

  AppTheme: ({ children }) => <div data-testid='AppTheme'>{children}</div>,
  AppThemeProvider: ({ children }) => <div data-testid='AppThemeProvider'>{children}</div>,
  Header: ({ children }) => <div data-testid='Header'>{children}</div>,
  Footer: ({ children }) => <div data-testid='Footer'>{children}</div>,
  NotFoundPage: () => <div data-testid='NotFoundPage'></div>,

  AxiosInterceptor: () => jest.fn(),
  CommonAction: {
    clearMessage: jest.fn(),
    addHistory: jest.fn(),
    setLanguage: jest.fn(),
  },
  ApiService: {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    returnPromise: jest.fn(),
    findById: jest.fn(),
    findBy: jest.fn(),
    countBy: jest.fn(),
  },
  ApiCrudService: {
    createOrUpdate: jest.fn(),
  },
  NewsService: {
    fetchNews: jest.fn(),
  },
  DefaultState: {},
  ReducersActions: {
    setDatas: jest.fn(),
    addDatas: jest.fn(),
    updataDatas: jest.fn(),
    setData: jest.fn(),
    setCount: jest.fn(),
    setSearch: jest.fn(),
    setPage: jest.fn(),
    setSearchAndPage: jest.fn(),
  },

  useApiService: () => ({
    httpGet: global.mockHttpGet,
    httpPost: global.mockHttpPost,
    httpPut: global.mockHttpPut,
    deleteById: global.mockDeleteById,
  }),
  useApiServiceCrud: () => ({
    createOrUpdate: (url, data, locale, callback) => {
      callback?.({ id: 1 });
    },
  }),
  useApiServiceFindBy: () => ({
    fetchBy: (values, page, orderBy, orderByAsc, callback) => {
      callback?.({ id: 1 });
    },
    resetStopLoad: jest.fn(),
  }),
  useApiServiceFetchBy: () => ({
    firstRender: global.firstRender,
    datas: mockDatas,
    search: '',
    count: 0,
    page: 0,
    doFetchByFields: jest.fn(),
    doSearch: (search, callback) => {
      callback?.();
    },
    order: { order: 'order', orderAsc: false },
    doChangePage: (page, callback) => () => {
      callback?.();
    },
    doChangeOrder: (order, callback) => {
      callback?.();
    },
  }),
  useAuth: () => ({
    user: { id: 1 },
  }),

  useCreateNews: () => {
    return {
      news: { id: 1 },
      fetchById: jest.fn(),
    };
  },
  useModal: () => {
    return {
      open: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };
  },
  useMessage: () => {
    return {
      setMessage: jest.fn(),
    };
  },
  useRole: () => {
    return {
      userConnected: global.mockUserConnected,
      hasUserRole: jest.fn(),
    };
  },
  useUserAuth: () => {
    return {
      useUserAuth: jest.fn(),
    };
  },
  useAppImage: () => {
    return {
      getImage: jest.fn(),
    };
  },
  configureStore: jest.fn(),
  createSlice: ({ name, initialState, reducers }) => {
    return {
      name: name,
      state: initialState,
      actions: reducers,
      reducer: reducers,
    };
  },
  RoleUtils: {
    hasProfile: () => true,
  },
  Provider: jest.fn(),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  combineReducers: jest.fn(),
  BrowserRouter: jest.fn(),
  Link: jest.fn(),
  Navigate: jest.fn(),
  Route: jest.fn(),
  Routes: jest.fn(),
};

module.exports = mocks;
