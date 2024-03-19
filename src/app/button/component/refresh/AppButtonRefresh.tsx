import { MdButton } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';

export interface IAppButtonRefreshProps {
  data?: string;
  callback?: (data?: string) => void;
}

const AppButtonRefresh: React.FC<IAppButtonRefreshProps> = ({ data, callback }) => {
  const handleClick = useCallback(() => {
    callback?.(data);
  }, [data, callback]);

  return (
    <>
      {callback && (
        <MdButton
          icon='refresh'
          variant='outlined'
          callback={handleClick}
          sx={{ minWidth: '27px !important', width: '27px', marginLeft: '0.3rem !important' }}
        />
      )}
    </>
  );
};

export default AppButtonRefresh;
