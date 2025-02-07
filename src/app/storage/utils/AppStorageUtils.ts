import { JSONObject } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { ICurrentUserDto } from '../../../api/dto/current-user/CurrentUserDto';
import { IUserDto } from '../../../module/user/user/dto/UserDto';

export const AppStorageUtils = {
  getConsent() {
    return localStorage.getItem('cookie-consent');
  },

  setConsent(consent: boolean) {
    localStorage.setItem('cookie-consent', '' + consent);
  },

  validateConsent() {
    const cookieConsent = localStorage.getItem('cookie-consent') ?? '';
    return cookieConsent === 'true';
  },

  set: (name: string, data: JSONObject) => {
    localStorage.setItem(name, JSON.stringify(data));
  },

  remove: (name: string) => {
    localStorage.removeItem(name);
  },

  get: <T>(name: string) => {
    const data = localStorage.getItem(name);
    if (!data) return undefined;
    try {
      return JSON.parse(localStorage.getItem(name) ?? '') as T;
    } catch (e) {
      console.error('failed to load json', name, e);
    }
  },

  setCurrentUser: <U>(data: ICurrentUserDto<U>): void => {
    AppStorageUtils.set('storage_name', data as JSONObject);
  },

  removeCurrentUser: (): void => {
    AppStorageUtils.remove('storage_name');
  },

  getCurrentUser: <U>() => {
    return AppStorageUtils.get<U>('storage_name');
  },

  getJwt: (): string => {
    const user = AppStorageUtils.getCurrentUser<ICurrentUserDto<IUserDto>>();
    return user?.jwt ? user.jwt : '';
  },
};
