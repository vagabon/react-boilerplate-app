import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../../store/Store';
import { IToolbarTitleProps, ToolbarTitle } from '../title/ToolbarTitle';

export const ToolbarSpace: React.FC<IToolbarTitleProps> = memo(({ image, title }) => {
  const force = useAppSelector((state) => state.common.drawer.force, shallowEqual);

  return (
    <>
      {force && (
        <div className='drawer-width MuiToolbar-root margin-left5 flex'>
          <ToolbarTitle title={title} image={image} />
        </div>
      )}
    </>
  );
});
