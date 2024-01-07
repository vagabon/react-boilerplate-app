import { Dispatch } from 'redux';
import { IProfileDto } from '../dto/ProfileDto';

import { ApiService } from '../../../../api/service/ApiService';
import { CommonAction } from '../../../../reducer/common/CommonReducer';

const ProfileService = {
  loadRoles: (
    filter: IProfileDto,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<IProfileDto[]> => {
    return ApiService.findBy<IProfileDto[]>(
      '/profiles/findBy',
      'name%',
      filter.search + '',
      first,
      max,
      orderField,
      order,
    );
  },

  countRoles: (search: string): Promise<number> => {
    return ApiService.countBy('/profiles/countBy', 'name%', search + '');
  },

  loadRole: (id: string | undefined): Promise<IProfileDto> => {
    return ApiService.findById<IProfileDto>('/profiles/findBy/', id);
  },

  create: (data: IProfileDto) => (dispatch: Dispatch) => {
    return ApiService.post('/profiles/findBy/', data).then(() => {
      dispatch(CommonAction.setMessage({ message: 'Création OK', type: 'success' }));
    });
  },

  update: (data: IProfileDto) => (dispatch: Dispatch) => {
    return ApiService.put('/profiles/findBy/', data).then(() => {
      dispatch(CommonAction.setMessage({ message: 'Sauvegarde OK', type: 'success' }));
    });
  },
};

export default ProfileService;
