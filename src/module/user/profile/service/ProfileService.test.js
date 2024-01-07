import { ApiService } from '../../../../api/service/ApiService';
import ProfileService from './ProfileService';

describe('ProfileService', () => {
  test('Given ProfileService when loadRoles then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'findBy').mockReturnValue(Promise.resolve({}));
    ProfileService.loadRoles('filter', 0, 10, 'orderField', 'order');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given ProfileService when countRoles then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'countBy').mockReturnValue(Promise.resolve({}));
    ProfileService.countRoles('search');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given ProfileService when loadRole then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'findById').mockReturnValue(Promise.resolve({}));
    ProfileService.loadRole(1);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given ProfileService when create then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    ProfileService.create({})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given ProfileService when update then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({}));
    ProfileService.update({})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });
});
