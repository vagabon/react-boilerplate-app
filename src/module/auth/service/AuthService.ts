import { ICurrentUserDto } from '../../../api/dto/current-user/CurrentUserDto';
import { ApiService } from '../../../api/service/ApiService';
import { AppStorageUtils } from '../../../app/storage/utils/AppStorageUtils';
import { IUserDto } from '../../user/user/dto/UserDto';
import { ICheckIdentityDto } from '../page/check-identity/dto/CheckIdentityDto';

const ENDPOINT_USER = '/auth';
const ENDPOINT_SIGNUP = ENDPOINT_USER + '/signup';
const ENDPOINT_SIGNIN = ENDPOINT_USER + '/signin';
const ENDPOINT_ACTIVATION = ENDPOINT_USER + '/activation';
const ENDPOINT_CREATE_IDENTITY_TOKEN = ENDPOINT_USER + '/createIdentityToken';
const ENDPOINT_CHECK_IDENTITY_TOKEN = ENDPOINT_USER + '/checkIdentityToken';
const ENDPOINT_RESET_PASSWORD = ENDPOINT_USER + '/resetPassword';
const ENDPOINT_GOOGLE_CONNECT = ENDPOINT_USER + '/google-connect';
const ENDPOINT_FACEBOOK_CONNECT = ENDPOINT_USER + '/facebook-connect';

export const AuthService = {
  register: (apiUrl: string, username?: string, email?: string, password?: string) => {
    return ApiService.post(apiUrl, ENDPOINT_SIGNUP, {
      username,
      email,
      password,
    });
  },

  login: (apiUrl: string, username: string, password: string) => {
    return ApiService.post<IUserDto>(apiUrl, ENDPOINT_SIGNIN, { username, password });
  },

  updateLocalStorage: (data: ICurrentUserDto<IUserDto>) => {
    AppStorageUtils.setCurrentUser(data);
  },

  activation: (apiUrl: string, token: string) => {
    return ApiService.post(apiUrl, ENDPOINT_ACTIVATION, { token });
  },

  createIdentityToken: (apiUrl: string, email: string) => {
    return ApiService.post(apiUrl, ENDPOINT_CREATE_IDENTITY_TOKEN, { email });
  },

  checkIdentityToken: (apiUrl: string, token: string) => {
    return ApiService.post<ICheckIdentityDto>(apiUrl, ENDPOINT_CHECK_IDENTITY_TOKEN, { token });
  },

  resetPassword: (apiUrl: string, token: string) => {
    return ApiService.post<ICheckIdentityDto>(apiUrl, ENDPOINT_RESET_PASSWORD, { token });
  },

  googleConnect: (apiUrl: string, googleToken: string) => {
    return ApiService.post<IUserDto>(apiUrl, ENDPOINT_GOOGLE_CONNECT, { googleToken });
  },

  facebookConnect: (apiUrl: string, accessToken: string) => {
    return ApiService.post<IUserDto>(apiUrl, ENDPOINT_FACEBOOK_CONNECT, { accessToken });
  },

  logout: () => {
    AppStorageUtils.removeCurrentUser();
  },
};
