import { ApiService } from '../../../../api/service/ApiService';
import UserService from './UserService';

describe('UserService', () => {
  test('Given UserService when loadUsers then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'findBy').mockReturnValue(Promise.resolve({}));
    UserService.loadUsers('filter', 0, 10, 'orderField', 'order');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given UserService when countUsers then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'countBy').mockReturnValue(Promise.resolve({}));
    UserService.countUsers('search');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given UserService when loadUser then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'findById').mockReturnValue(Promise.resolve({}));
    UserService.loadUser(1);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given UserService when create then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    UserService.create({})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given UserService when update then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({}));
    UserService.update({})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });
});
