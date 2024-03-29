import { JSONObject } from '@vagabond-inc/react-boilerplate-md';
import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../module/user/user/dto/UserDto';

export const StorageUtils = {
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
    if (!StorageUtils.validateConsent()) {
      return;
    }
    localStorage.setItem(name, JSON.stringify(data));
  },

  remove: (name: string) => {
    localStorage.removeItem(name);
  },

  get: <T>(name: string) => {
    if (!StorageUtils.validateConsent()) {
      return;
    }
    try {
      return JSON.parse(localStorage.getItem(name) ?? '') as T;
    } catch (e) {
      console.error('failed to load json', name);
    }
  },

  setCurrentUser: <U>(data: ICurrentUserDto<U>): void => {
    if (StorageUtils.validateConsent()) {
      StorageUtils.set('storage_name', data as JSONObject);
    } else {
      StorageUtils.removeCurrentUser();
    }
  },

  removeCurrentUser: (): void => {
    StorageUtils.remove('storage_name');
  },

  getCurrentUser: <U>() => {
    return StorageUtils.get<U>('storage_name');
  },

  getJwt: (): string => {
    const user = StorageUtils.getCurrentUser<ICurrentUserDto<IUserDto>>();
    return user?.jwt ? user.jwt : '';
  },
};
