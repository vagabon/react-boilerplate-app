import { StorageUtils } from './StorageUtils';

describe('StorageUtils setCurrentUser', () => {
  test('Given StorageUtils When current user is set Then localstorage is called', () => {
    const localstorageSpy = jest.spyOn(window.localStorage, 'setItem');
    const data = {};
    StorageUtils.setCurrentUser(data);
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name', '{}');
  });
});

describe('StorageUtils removeCurrentUser', () => {
  test('Given StorageUtils When current user is removed Then localstorage is called', () => {
    const localstorageSpy = jest.spyOn(window.localStorage, 'removeItem');
    StorageUtils.removeCurrentUser();
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });
});

describe('storage getCurrentUser', () => {
  test('Given Storage When current user is get Then localstorage is called', () => {
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem');
    const tested = StorageUtils.getCurrentUser();
    expect(tested).toBe(null);
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });

  test('Given StorageUtils When current user is get with data Then localstorage is called', () => {
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('{"name": "name"}');
    const tested = StorageUtils.getCurrentUser();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });

  test('Given StorageUtils When current user is get with wrong data Then localstorage is in error', () => {
    const localstorageSpy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('{{"name": "name"}');
    const tested = StorageUtils.getCurrentUser();
    expect(tested).toBeNull();
    expect(localstorageSpy).toHaveBeenLastCalledWith('storage_name');
  });
});

describe('StorageUtils getJwt', () => {
  test('Given StorageUtils When jwt is get with data Then localstorage is called', () => {
    const localstorageSpy = jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({ jwt: 'jwt' });
    const tested = StorageUtils.getJwt();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenCalled();
  });

  test('Given StorageUtils When empty current user Then jwt is empty', () => {
    const localstorageSpy = jest.spyOn(StorageUtils, 'getCurrentUser').mockReturnValue({});
    const tested = StorageUtils.getJwt();
    expect(tested).not.toBeNull();
    expect(localstorageSpy).toHaveBeenCalled();
  });
});
