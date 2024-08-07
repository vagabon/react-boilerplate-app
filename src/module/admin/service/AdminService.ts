import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { Dispatch } from 'redux';
import { IPageableDto } from '../../../api/dto/pageable/PageableDto';
import { ApiService } from '../../../api/service/ApiService';
import { IOrderState } from '../../../store/reducer/BaseReducer';
import { CommonAction } from '../../../store/reducer/common/CommonReducers';

const ENDPOINT_FINDBY = '/findBy';
const ENDPOINT_FINDBY_ID = '/';
const ENDPOINT_CREATE = '/';
const ENDPOINT_UPDATE = '/';

export const AdminService = {
  findBy: (
    apiUrl: string,
    endPoint: string,
    champs: string,
    value: string,
    first: number,
    max: number,
    order: IOrderState,
  ): Promise<IPageableDto<IApiDto[]>> => {
    const orderString = order.orderAsc ? '' : 'Desc';
    const orderConst = order.order ? '>>' + order.order + orderString : '';
    const values = value + ',' + value + ',' + value + ',' + value + ',' + value;
    return ApiService.get<IPageableDto<IApiDto[]>>(
      apiUrl,
      '/' +
        endPoint +
        ENDPOINT_FINDBY +
        '?fields=' +
        champs +
        orderConst +
        '&values=' +
        values +
        '&first=' +
        first +
        '&max=' +
        max,
    ).then((data) => {
      return Promise.resolve(data);
    });
  },

  findById: <T>(apiUrl: string, endPoint: string, id: string | undefined) => {
    return ApiService.get<T>(apiUrl, '/' + endPoint + ENDPOINT_FINDBY_ID + id).then((data: T) => {
      return Promise.resolve(data);
    });
  },

  create:
    (apiUrl: string, endPoint: string, data: IApiDto) =>
    (dispatch: Dispatch): Promise<IApiDto> => {
      return ApiService.post<IApiDto>(apiUrl, '/' + endPoint + ENDPOINT_CREATE, data).then((dataNew: IApiDto) => {
        dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'CREATION_OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    },

  update:
    (apiUrl: string, endPoint: string, data: IApiDto) =>
    (dispatch: Dispatch): Promise<IApiDto> => {
      return ApiService.put<IApiDto>(apiUrl, '/' + endPoint + ENDPOINT_UPDATE, data).then((dataNew: IApiDto) => {
        dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'UPDATE_OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    },
};
