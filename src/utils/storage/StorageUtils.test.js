import { StorageUtils } from './StorageUtils';

describe('StorageUtils set get remove', () => {
  test('Given StorageUtils When current user is set Then localstorage is called', () => {
    const name = 'name';
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem');
    StorageUtils.set(name, {});
    StorageUtils.get(name);
    StorageUtils.remove(name);
    expect(localstorageSpy).toHaveBeenCalled();
  });
});

describe('StorageUtils setCurrentUser', () => {
  test('Given StorageUtils When current user is set Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'setItem');
    const data = {};
    StorageUtils.setCurrentUser(data);
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name', '{}');
  });
});

describe('StorageUtils removeCurrentUser', () => {
  test('Given StorageUtils When current user is removed Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'removeItem');
    StorageUtils.removeCurrentUser();
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });
});

describe('storage getCurrentUser', () => {
  test('Given Storage When current user is get Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem');
    const tested = StorageUtils.getCurrentUser();
    expect(tested).not.toBe(undefined);
    expect(localstorageSpy).toHaveBeenCalled();
  });

  test('Given StorageUtils When current user is get with data Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('{"name": "name"}');
    const tested = StorageUtils.getCurrentUser();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenLastCalledWith('cookie-consent');
  });

  test('Given StorageUtils When current user is get with wrong data Then localstorage is in error', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('{{"name": "name"}');
    const tested = StorageUtils.getCurrentUser();
    expect(tested).toBe(undefined);
    expect(localstorageSpy).toHaveBeenLastCalledWith('cookie-consent');
  });
});

describe('StorageUtils getJwt', () => {
  test('Given StorageUtils When jwt is get with data Then localstorage is called', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({ jwt: 'jwt' });
    const tested = StorageUtils.getJwt();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenCalled();
  });

  test('Given StorageUtils When empty current user Then jwt is empty', () => {
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue('true');
    const localstorageSpy = jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({});
    const tested = StorageUtils.getJwt();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenCalled();
  });
});
