import { ID } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { Dispatch } from 'redux';
import { ApiService } from '../../../../api/service/ApiService';
import { CommonAction } from '../../../../store/reducer/common/CommonReducers';
import { IUserDto } from '../dto/UserDto';

const ENDPOINT_USERS = '/user';
const ENDPOINT_USERS_FINDBY = ENDPOINT_USERS + '/findBy';
const ENDPOINT_USERS_COUNTBY = ENDPOINT_USERS + '/countBy';

export const UserService = {
  fetchById: (apiUrl: string, id: ID): Promise<IUserDto> => {
    return ApiService.findById<IUserDto>(apiUrl, ENDPOINT_USERS, id);
  },

  loadUsers: (
    apiUrl: string,
    filter: IUserDto,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<IUserDto[]> => {
    return ApiService.findBy<IUserDto[]>(
      apiUrl,
      ENDPOINT_USERS_FINDBY,
      'username%And|Email%',
      filter.search + ',' + filter.search,
      first,
      max,
      { order: orderField, orderAsc: order === 'asc' },
    );
  },

  countUsers: (apiUrl: string, search: string): Promise<number> => {
    return ApiService.countBy(apiUrl, ENDPOINT_USERS_COUNTBY, 'username%And|Email%', search + ',' + search);
  },

  loadUser: (apiUrl: string, id: string | undefined): Promise<IUserDto> => {
    return ApiService.findById<IUserDto>(apiUrl, ENDPOINT_USERS, id);
  },

  create: (apiUrl: string, data: IUserDto) => (dispatch: Dispatch) => {
    return ApiService.post(apiUrl, ENDPOINT_USERS, data).then(() => {
      dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'CREATION_OK', type: 'success' }));
    });
  },

  update: (apiUrl: string, data: IUserDto) => (dispatch: Dispatch) => {
    return ApiService.put(apiUrl, ENDPOINT_USERS, data).then(() => {
      dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'UPDATE_OK', type: 'success' }));
    });
  },

  updateEmail: (apiUrl: string, id: ID, email: string): Promise<IUserDto> => {
    return ApiService.put<IUserDto>(apiUrl, ENDPOINT_USERS + '/email', {
      id,
      email,
    }).then((data) => data);
  },

  updatePassword: (apiUrl: string, id: ID, password: string, newPassword: string): Promise<IUserDto> => {
    return ApiService.put<IUserDto>(apiUrl, ENDPOINT_USERS + '/password', {
      id,
      password,
      newPassword,
    }).then((data) => data);
  },
};
