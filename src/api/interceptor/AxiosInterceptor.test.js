import axios from 'axios';
import { StorageUtils } from '../../utils/storage/StorageUtils';
import { AxiosInterceptor } from './AxiosInterceptor';

const store = { dispatch: jest.fn() };

console.log = jest.fn();

describe('API INTERCEPTOR', () => {
  AxiosInterceptor(store);

  test('Given axios request When its called without jwt token Then request is not changed', () => {
    const config = { headers: {}, url: '/test' };
    const tested = axios.interceptors.request.handlers[0].fulfilled(config);
    expect(tested).toMatchObject(config);
  });

  test('Given axios request When its called with a jwt token Then request is upgrade', () => {
    jest.spyOn(StorageUtils, 'getJwt').mockReturnValue('token');
    const config = { headers: { test: 'test' }, url: '/test' };
    const tested = axios.interceptors.request.handlers[0].fulfilled(config);
    expect(tested).toMatchObject(config);
  });

  test('Given axios request When its on error Then error is keeped', () => {
    const error = { response: { status: 401 } };
    const tested = axios.interceptors.request.handlers[0].rejected(error);
    expect(tested).toMatchObject(error);
  });

  test('Given axios response When its in success Then response if retrieved', () => {
    const config = { config: { url: '/url', data: [] } };
    const tested = axios.interceptors.response.handlers[0].fulfilled(config);
    expect(tested).toMatchObject(config);
  });

  test('Given axios response When its in error Then error is keeped', () => {
    const error = { response: { status: 401 }, config: { url: '/url', data: [] } };
    const tested = axios.interceptors.response.handlers[0].rejected(error);
    expect(tested).not.toBeNull();
  });

  test('Given axios response When its in error 401 and not retry Then refresh token is called', () => {
    jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({ jwtRefresh: 'token' });
    jest.spyOn(axios, 'post').mockImplementation(() =>
      Promise.resolve({
        data: {
          jwt: 'newToken',
        },
      }),
    );
    const error = { response: { status: 401 }, config: { url: '/url', data: [], _retry: false } };
    const tested = axios.interceptors.response.handlers[0].rejected(error);
    expect(tested).not.toBeNull();
  });

  test('Given axios response When its in error 401 and in retry Then refresh token is not called', () => {
    jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({ jwtRefresh: 'token' });
    const error = {
      response: { data: { debugMessage: 'debugMessage' } },
      config: { url: '/url', data: [], _retry: true },
    };
    const tested = axios.interceptors.response.handlers[0].rejected(error);
    expect(tested).not.toBeNull();
  });

  test('Given axios response When its in error 401 and in retry with message Then refresh token is not called', () => {
    jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({ jwtRefresh: 'token' });
    const error = { message: 'message', config: { url: '/url', data: [], _retry: true } };
    const tested = axios.interceptors.response.handlers[0].rejected(error);
    expect(tested).not.toBeNull();
  });

  test('Given axios response When its in error 401 and in retry without message Then refresh token is not called', () => {
    jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({ jwtRefresh: 'token' });
    const error = { config: { url: '/url', data: [], _retry: true } };
    const tested = axios.interceptors.response.handlers[0].rejected(error);
    expect(tested).not.toBeNull();
  });
});
