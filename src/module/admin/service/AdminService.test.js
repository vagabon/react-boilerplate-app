import { ApiService } from '../../../api/service/ApiService';
import AdminService from './AdminService';

describe('AdminService', () => {
  test('Given AdminService when findBy then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'get').mockReturnValue(Promise.resolve({}));
    AdminService.findBy('endPoint', 'field', 'value', 0, 100, 'order', 'asc');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AdminService when findById then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'get').mockReturnValue(Promise.resolve({}));
    AdminService.findById('endPoint', 1);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AdminService when create then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AdminService.create('endPoint', {})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AdminService when update then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({}));
    AdminService.update('endPoint', {})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });
});
