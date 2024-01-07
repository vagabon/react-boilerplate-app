import { ApiService } from '../ApiService';
import { ApiCrudService } from './ApiCrudService';

describe('ApiCrudService', () => {
  test('Given ApiCrudService when createOrUpdate then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    ApiCrudService.createOrUpdate('endpoint', {});
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given ApiCrudService when createOrUpdate then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({}));
    ApiCrudService.createOrUpdate('endpoint', { id: 1 });
    expect(mockService).toBeCalledTimes(1);
  });
});
