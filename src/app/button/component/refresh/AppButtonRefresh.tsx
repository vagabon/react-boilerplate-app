import { MdButton } from '@vagabond-inc/react-boilerplate-md';

export interface IAppButtonRefreshProps {
  callback?: () => void;
}

const AppButtonRefresh: React.FC<IAppButtonRefreshProps> = ({ callback }) => {
  return (
    <>
      {callback && (
        <MdButton
          icon='refresh'
          variant='outlined'
          callback={callback}
          sx={{ minWidth: '27px !important', width: '27px', marginLeft: '0.3rem !important' }}
        />
      )}
    </>
  );
};

export default AppButtonRefresh;
