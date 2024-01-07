import { IApiDto } from '@vagabond-inc/react-boilerplate-md';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminReducerDto, IAdminStateDto } from '../dto/AdminReducerDto';
import { AdminAction } from '../reducer/AdminReducer';

const MAX_DEFAULT: number = 10;
const ORDER_DEFAULT: 'asc' | 'desc' = 'asc';

export const useAdminState = (activePage: string, pageConf: IAdminTabDto) => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector<IAdminReducerDto>((state) => state.admin);
  const [state, setState] = useState<IAdminStateDto>();

  useEffect(() => {
    const activeState = admin[activePage as keyof IAdminReducerDto];
    setState(activeState);
  }, [admin, activePage]);

  useEffect(() => {
    let newState = state;
    if (!newState?.datas && pageConf) {
      newState = {
        count: 0,
        datas: [],
        data: {} as IApiDto,
        filter: {
          search: '',
        },
        table: {
          page: 0,
          rowsPerPage: MAX_DEFAULT,
          sortBy: pageConf?.sortBy,
          sortByOrder: ORDER_DEFAULT,
        },
      };
      dispatch(AdminAction.setState({ activePage, newState }));
    }
  }, [dispatch, activePage, state, pageConf]);

  return { state };
};
