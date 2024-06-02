import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../../store/Store';

export const ToolbarSpace: React.FC = memo(() => {
  const force = useAppSelector((state) => state.common.drawer.force, shallowEqual);

  return <>{force && <div className='drawer-width'>&nbsp;</div>}</>;
});
