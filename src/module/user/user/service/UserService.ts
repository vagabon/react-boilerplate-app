import { ID, UuidUtils } from '@vagabond-inc/react-boilerplate-md';
import { Dispatch } from 'redux';
import { ApiService } from '../../../../api/service/ApiService';
import { CommonAction } from '../../../../reducer/common/CommonReducer';
import { IUserDto } from '../dto/UserDto';

const ENDPOINT_USERS = '/user';
const ENDPOINT_USERS_FINDBY = ENDPOINT_USERS + '/findBy';
const ENDPOINT_USERS_COUNTBY = ENDPOINT_USERS + '/countBy';

const UserService = {
  fetchById: (id: ID): Promise<IUserDto> => {
    return ApiService.findById<IUserDto>(ENDPOINT_USERS, id);
  },

  loadUsers: (filter: IUserDto, first: number, max: number, orderField: string, order: string): Promise<IUserDto[]> => {
    return ApiService.findBy<IUserDto[]>(
      ENDPOINT_USERS_FINDBY,
      'username%And|Email%',
      filter.search + ',' + filter.search,
      first,
      max,
      orderField,
      order,
    );
  },

  countUsers: (search: string): Promise<number> => {
    return ApiService.countBy(ENDPOINT_USERS_COUNTBY, 'username%And|Email%', search + ',' + search);
  },

  loadUser: (id: string | undefined): Promise<IUserDto> => {
    return ApiService.findById<IUserDto>(ENDPOINT_USERS, id);
  },

  create: (data: IUserDto) => (dispatch: Dispatch) => {
    return ApiService.post(ENDPOINT_USERS, data).then(() => {
      dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'Création OK', type: 'success' }));
    });
  },

  update: (data: IUserDto) => (dispatch: Dispatch) => {
    return ApiService.put(ENDPOINT_USERS, data).then(() => {
      dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'Sauvegarde OK', type: 'success' }));
    });
  },

  updateEmail: (id: ID, email: string): Promise<IUserDto> => {
    return ApiService.put<IUserDto>(ENDPOINT_USERS + '/email', {
      id,
      email,
    }).then((data) => data);
  },

  updatePassword: (id: ID, password: string, newPassword: string): Promise<IUserDto> => {
    return ApiService.put<IUserDto>(ENDPOINT_USERS + '/password', {
      id,
      password,
      newPassword,
    }).then((data) => data);
  },
};

export default UserService;
