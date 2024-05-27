import { AppStorageUtils } from './AppStorageUtils';

describe('AppStorageUtils set get remove', () => {
  test('Given AppStorageUtils When current user is set Then localstorage is called', () => {
    const name = 'name';
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem');
    AppStorageUtils.set(name, {});
    AppStorageUtils.get(name);
    AppStorageUtils.remove(name);
    expect(localstorageSpy).toHaveBeenCalled();
  });
});

describe('AppStorageUtils setCurrentUser', () => {
  test('Given AppStorageUtils When current user is set Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'setItem');
    const data = {};
    AppStorageUtils.setCurrentUser(data);
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name', '{}');
  });
});

describe('AppStorageUtils removeCurrentUser', () => {
  test('Given AppStorageUtils When current user is removed Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'removeItem');
    AppStorageUtils.removeCurrentUser();
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });
});

describe('storage getCurrentUser', () => {
  test('Given Storage When current user is get Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem');
    const tested = AppStorageUtils.getCurrentUser();
    expect(tested).not.toBe(undefined);
    expect(localstorageSpy).toHaveBeenCalled();
  });

  test('Given AppStorageUtils When current user is get with data Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('{"name": "name"}');
    const tested = AppStorageUtils.getCurrentUser();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });

  test('Given AppStorageUtils When current user is get with wrong data Then localstorage is in error', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('{{"name": "name"}');
    const tested = AppStorageUtils.getCurrentUser();
    expect(tested).toBe(undefined);
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });
});

describe('AppStorageUtils getJwt', () => {
  test('Given AppStorageUtils When jwt is get with data Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(AppStorageUtils, 'getCurrentUser').mockReturnValue({ jwt: 'jwt' });
    const tested = AppStorageUtils.getJwt();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenCalled();
  });

  test('Given AppStorageUtils When empty current user Then jwt is empty', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(AppStorageUtils, 'getCurrentUser').mockReturnValue({});
    const tested = AppStorageUtils.getJwt();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenCalled();
  });
});
