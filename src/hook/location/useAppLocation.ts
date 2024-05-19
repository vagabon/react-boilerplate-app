import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { CommonAction } from '../../reducer/common/CommonReducers';
import { useAppDispatch, useAppSelector } from '../../store/Store';

export const useAppLocation = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();
  const loading = useAppSelector((state) => state.common.loading, shallowEqual);
  const history = useAppSelector((state) => state.common.history, shallowEqual);

  const goBack = useCallback((): void => {
    const lastPage = history?.[history.length - 2];
    dispatch(CommonAction.sliceHistory());
    lastPage && navigate(lastPage.link);
  }, [dispatch, navigate, history]);

  return { loading, history, goBack };
};
