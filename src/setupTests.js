import { mockBoilerPlateMd } from './setupTests-md';

console.error = jest.fn();

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

jest.mock('@vagabond-inc/react-boilerplate-md', () => ({ ...mockBoilerPlateMd }));

jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid='Helmet'>{children}</div>,
  HelmetProvider: ({ children }) => <div data-testid='HelmetProvider'>{children}</div>,
}));

window.ENV = {
  API_URL: 'http://localhost:8090',
};
