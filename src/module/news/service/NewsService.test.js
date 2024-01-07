import { ApiService } from '../../../api/service/ApiService';
import NewsService from './NewsService';

describe('NewsService', () => {
  test('Given NewsService when fetchNews then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'findBy').mockReturnValue(Promise.resolve({}));
    NewsService.fetchNews('filter', 0, 10, 'orderField', 'order');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given NewsService when fetchById then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'findById').mockReturnValue(Promise.resolve({}));
    NewsService.fetchById(1);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given NewsService when createOrUpdate then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    NewsService.createOrUpdate({})(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given NewsService when createOrUpdate then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({}));
    NewsService.createOrUpdate({ id: 1 })(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });
});
