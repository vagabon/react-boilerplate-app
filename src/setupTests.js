import './setupTests-md';

console.debug = jest.fn();

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

global.mockEnqueueSnackbar = jest.fn();

jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: global.mockEnqueueSnackbar,
  }),
  closeSnackbar: jest.fn(),
  SnackbarProvider: ({ children }) => <>{children}</>,
}));

jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid='Helmet'>{children}</div>,
  HelmetProvider: ({ children }) => <div data-testid='HelmetProvider'>{children}</div>,
}));

jest.mock('@mui/x-charts', () => ({
  BarChart: ({ children }) => <div data-testid='BarChart'>{children}</div>,
  PieChart: ({ children }) => <div data-testid='PieChart'>{children}</div>,
}));

/******************* AFTER EACH RESET MOCK *****************************/

beforeEach(() => {
  global.useAppDispatchSpy.mockReturnValue(global.mockDispatch);
});
