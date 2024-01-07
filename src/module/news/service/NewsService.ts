import { ID } from '@vagabond-inc/react-boilerplate-md';
import { Dispatch } from 'redux';
import { ApiService } from '../../../api/service/ApiService';
import { IPageableDto } from '../../../dto/pageable/PageableDto';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { INewsDto } from '../dto/NewsDto';

const ENDPOINT_NEWS = '/news';
const ENDPOINT_NEWS_FINDBY = '/news/findBy';

const NewsService = {
  fetchNews: (
    filter: INewsDto,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<IPageableDto<INewsDto[]>> => {
    const champs = '(title%And|Description%)';
    const value = filter.search ?? '';
    const values = value + ',' + value;
    return ApiService.findBy<IPageableDto<INewsDto[]>>(
      ENDPOINT_NEWS_FINDBY,
      champs,
      values,
      first,
      max,
      orderField,
      order,
    );
  },

  fetchById: (id: ID): Promise<INewsDto> => {
    return ApiService.findById<INewsDto>(ENDPOINT_NEWS, id);
  },

  createOrUpdate:
    (data: INewsDto) =>
    (dispatch: Dispatch): Promise<INewsDto> => {
      if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
        return ApiService.put<INewsDto>(ENDPOINT_NEWS + '/', data).then((dataNew: INewsDto) => {
          dispatch(CommonAction.setMessage({ message: 'Sauvegarde OK', type: 'success' }));
          return Promise.resolve(dataNew);
        });
      } else {
        return ApiService.post<INewsDto>(ENDPOINT_NEWS + '/', data).then((dataNew: INewsDto) => {
          dispatch(CommonAction.setMessage({ message: 'Création OK', type: 'success' }));
          return Promise.resolve(dataNew);
        });
      }
    },
};

export default NewsService;
