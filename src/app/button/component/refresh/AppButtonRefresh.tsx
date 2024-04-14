import { MdButton } from '@vagabond-inc/react-boilerplate-md';
import { memo, useCallback } from 'react';

export interface IAppButtonRefreshProps {
  data?: string;
  callback?: (data?: string) => void;
}

const AppButtonRefresh: React.FC<IAppButtonRefreshProps> = memo(({ data, callback }) => {
  const handleClick = useCallback(() => {
    callback?.(data);
  }, [data, callback]);

  return (
    <>{callback && <MdButton className='button-icon' icon='refresh' variant='outlined' callback={handleClick} />}</>
  );
});

export default AppButtonRefresh;
