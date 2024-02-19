import { IApiDto, UuidUtils } from '@vagabond-inc/react-boilerplate-md';
import { Dispatch } from 'redux';
import { ApiService } from '../../../api/service/ApiService';
import { IPageableDto } from '../../../dto/pageable/PageableDto';
import { CommonAction } from '../../../reducer/common/CommonReducer';

const ENDPOINT_FINDBY = '/findBy';
const ENDPOINT_FINDBY_ID = '/';
const ENDPOINT_CREATE = '/';
const ENDPOINT_UPDATE = '/';

const AdminService = {
  findBy: (
    endPoint: string,
    champs: string,
    value: string,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<IPageableDto<IApiDto[]>> => {
    const orderString = order === 'asc' ? '' : 'Desc';
    const orderConst = orderField ? '>>' + orderField + orderString : '';
    const values = value + ',' + value + ',' + value + ',' + value + ',' + value;
    return ApiService.get<IPageableDto<IApiDto[]>>(
      '/' +
        endPoint +
        ENDPOINT_FINDBY +
        encodeURI('?fields=' + champs + orderConst + '&values=' + values + '&first=' + first + '&max=' + max),
    ).then((data) => {
      return Promise.resolve(data);
    });
  },

  findById: <T>(endPoint: string, id: string | undefined) => {
    return ApiService.get<T>('/' + endPoint + ENDPOINT_FINDBY_ID + id).then((data: T) => {
      return Promise.resolve(data);
    });
  },

  create:
    (endPoint: string, data: IApiDto) =>
    (dispatch: Dispatch): Promise<IApiDto> => {
      return ApiService.post<IApiDto>('/' + endPoint + ENDPOINT_CREATE, data).then((dataNew: IApiDto) => {
        dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'Création OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    },

  update:
    (endPoint: string, data: IApiDto) =>
    (dispatch: Dispatch): Promise<IApiDto> => {
      return ApiService.put<IApiDto>('/' + endPoint + ENDPOINT_UPDATE, data).then((dataNew: IApiDto) => {
        dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'Sauvegarde OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    },
};

export default AdminService;
