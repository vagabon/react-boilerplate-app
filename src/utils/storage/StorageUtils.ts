import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';

export const StorageUtils = {
  setCurrentUser: <U>(data: ICurrentUserDto<U>): void => {
    localStorage.setItem('storage_name', JSON.stringify(data));
  },

  removeCurrentUser: (): void => {
    localStorage.removeItem('storage_name');
  },

  getCurrentUser: <U>(): ICurrentUserDto<U> | null => {
    let user: ICurrentUserDto<U> | null = null;
    const userStorage: string | null = localStorage.getItem('storage_name');
    if (userStorage) {
      try {
        user = JSON.parse(userStorage);
      } catch (e) {
        console.error('failed to load json', userStorage);
      }
    }
    console.log('localstorage', user);
    return user;
  },

  getJwt: (): string => {
    const user = StorageUtils.getCurrentUser();
    return user?.jwt ? user.jwt : '';
  },
};
