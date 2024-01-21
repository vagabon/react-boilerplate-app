import { ID } from '@vagabond-inc/react-boilerplate-md';
import { Dispatch } from 'redux';
import { ApiService } from '../../../api/service/ApiService';
import { IPageableDto } from '../../../dto/pageable/PageableDto';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { INewsDto } from '../dto/NewsDto';

const NewsService = {
  fetchNews: (
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
    return ApiService.findBy<IPageableDto<INewsDto[]>>(
      '/' + endPoint + '/findBy',
      champs,
      values,
      first,
      max,
      orderField,
      order,
    );
  },

  fetchById: (endPoint: string, id: ID): Promise<INewsDto> => {
    return ApiService.findById<INewsDto>('/' + endPoint, id);
  },

  createOrUpdate:
    (endPoint: string, data: INewsDto) =>
    (dispatch: Dispatch): Promise<INewsDto> => {
      if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
        return ApiService.put<INewsDto>('/' + endPoint + '/', data).then((dataNew: INewsDto) => {
          dispatch(CommonAction.setMessage({ message: 'Sauvegarde OK', type: 'success' }));
          return Promise.resolve(dataNew);
        });
      } else {
        return ApiService.post<INewsDto>('/' + endPoint + '/', data).then((dataNew: INewsDto) => {
          dispatch(CommonAction.setMessage({ message: 'Création OK', type: 'success' }));
          return Promise.resolve(dataNew);
        });
      }
    },
};

export default NewsService;
