import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { ApiService } from '../ApiService';

export const ApiCrudService = {
  createOrUpdate: <T extends IApiDto>(baseUrl: string, endPoint: string, data: T) => {
    if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
      return ApiService.put<T>(baseUrl, endPoint + '/', data).then((dataNew: T) => {
        return Promise.resolve(dataNew);
      });
    } else {
      return ApiService.post<T>(baseUrl, endPoint + '/', data).then((dataNew: T) => {
        return Promise.resolve(dataNew);
      });
    }
  },
};
