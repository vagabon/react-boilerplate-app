import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../store/Store';
import { CommonAction, IPathDto } from '../../../../store/reducer/common/CommonReducers';

export interface IButtonGoBackProps {
  onGoBack?: () => void;
}

export const ButtonGoBack: React.FC<IButtonGoBackProps> = ({ onGoBack }) => {
  const dispatch = useAppDispatch();
  const { navigate } = useAppRouter();
  const history = useAppSelector((state) => state.common.history, shallowEqual);

  const goBack = useCallback((): void => {
    if (onGoBack) {
      onGoBack();
    } else {
      const lastPage: IPathDto = history[history.length - 2];
      dispatch(CommonAction.sliceHistory());
      navigate(lastPage.link);
    }
  }, [dispatch, history, navigate, onGoBack]);

  return <>{history.length > 1 && <MdButton label='Retour' variant='text' callback={goBack} />}</>;
};
