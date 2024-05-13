import { UuidUtils } from '@vagabond-inc/react-boilerplate-md/dist/utils/uuid/UuidUtils';
import { Dispatch } from 'redux';
import { ApiService } from '../../../../api/service/ApiService';
import { CommonAction } from '../../../../reducer/common/CommonReducers';
import { IProfileDto } from '../dto/ProfileDto';

export const ProfileService = {
  loadRoles: (
    apiUrl: string,
    filter: IProfileDto,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<IProfileDto[]> => {
    return ApiService.findBy<IProfileDto[]>(apiUrl, '/profiles/findBy', 'name%', filter.search + '', first, max, {
      order: orderField,
      orderAsc: order === 'asc',
    });
  },

  countRoles: (apiUrl: string, search: string): Promise<number> => {
    return ApiService.countBy(apiUrl, '/profiles/countBy', 'name%', search + '');
  },

  loadRole: (apiUrl: string, id: string | undefined): Promise<IProfileDto> => {
    return ApiService.findById<IProfileDto>(apiUrl, '/profiles/findBy/', id);
  },

  create: (apiUrl: string, data: IProfileDto) => (dispatch: Dispatch) => {
    return ApiService.post(apiUrl, '/profiles/findBy/', data).then(() => {
      dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'CREATION_OK', type: 'success' }));
    });
  },

  update: (apiUrl: string, data: IProfileDto) => (dispatch: Dispatch) => {
    return ApiService.put(apiUrl, '/profiles/findBy/', data).then(() => {
      dispatch(CommonAction.setMessage({ id: UuidUtils.createUUID(), message: 'UPDATE_OK', type: 'success' }));
    });
  },
};
