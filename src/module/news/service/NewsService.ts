import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { Dispatch } from 'redux';
import { ApiService } from '../../../api/service/ApiService';
import { IPageableDto } from '../../../dto/pageable/PageableDto';
import { CommonAction } from '../../../reducer/common/CommonReducers';
import { INewsDto } from '../dto/NewsDto';

export const NewsService = {
  fetchNews: (
    apiUrl: string,
    endPoint: string,
    filter: INewsDto,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<IPageableDto<INewsDto[]>> => {
    const champs = '(title%And|Description%)AndActive';
    const value = filter.search ?? '';
    const values = value + ',' + value + ',true';
    return ApiService.findBy<IPageableDto<INewsDto[]>>(apiUrl, '/' + endPoint + '/findBy', champs, values, first, max, {
      order: orderField,
      orderAsc: order === 'asc',
    });
  },

  fetchById: (apiUrl: string, endPoint: string, id: ID): Promise<INewsDto> => {
    return ApiService.findById<INewsDto>(apiUrl, '/' + endPoint, id);
  },

  createOrUpdate: (apiUrl: string, endPoint: string, data: INewsDto, dispatch: Dispatch): Promise<INewsDto> => {
    if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
      return ApiService.put<INewsDto>(apiUrl, '/' + endPoint + '/', data).then((dataNew: INewsDto) => {
        dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'UPDATE_OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    } else {
      return ApiService.post<INewsDto>(apiUrl, '/' + endPoint + '/', data).then((dataNew: INewsDto) => {
        dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'CREATION_OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    }
  },
};
