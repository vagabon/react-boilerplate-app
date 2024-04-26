import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { CommonAction } from '../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../store/Store';

export const useAppLocation = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();
  const { loading, history } = useAppSelector((state) => state.common);

  const goBack = useCallback((): void => {
    const lastPage = history?.[history.length - 2];
    dispatch(CommonAction.sliceHistory());
    lastPage && navigate(lastPage.link);
  }, [dispatch, navigate, history]);

  return { loading, history, goBack };
};
