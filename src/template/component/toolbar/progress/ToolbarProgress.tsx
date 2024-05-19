import { MdLinearProgress } from '@vagabond-inc/react-boilerplate-md/dist/md/component/progress/linear/MdLinearProgress';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../../store/Store';

const ToolbarProgress: React.FC = () => {
  const loading = useAppSelector((state) => state.common.loading, shallowEqual);

  return <>{loading && <MdLinearProgress className='linear-progress' />}</>;
};
export default ToolbarProgress;
