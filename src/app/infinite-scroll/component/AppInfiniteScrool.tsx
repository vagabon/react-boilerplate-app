import { ReactNode, memo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CommonAction } from '../../../reducer/common/CommonReducers';
import { useAppDispatch } from '../../../store/Store';

export interface IAppInfiniteScroolProps {
  id: string;
  className?: string;
  children?: ReactNode;
  callBack?: () => void;
}

export const AppInfiniteScrool: React.FC<IAppInfiniteScroolProps> = memo(({ className = '', callBack, ...rest }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const stopScroll = useRef(false);

  const handleNavigation = useCallback(
    (callBack?: () => void) => () => {
      const wrappedElement = document.getElementById(rest.id);
      const scrollTop = wrappedElement?.scrollTop ?? 0;

      dispatch(CommonAction.setScrools({ pathname: location.pathname, position: scrollTop }));

      if (
        wrappedElement &&
        callBack &&
        wrappedElement.scrollHeight - wrappedElement.scrollTop <= wrappedElement.clientHeight + 350
      ) {
        if (stopScroll.current === false) {
          stopScroll.current = true;
          callBack();
          setTimeout(() => {
            stopScroll.current = false;
          }, 1000);
        }
      }
    },
    [rest.id, location, dispatch],
  );

  return (
    <div id={rest.id} className={'container infinite-container ' + className} onScroll={handleNavigation(callBack)}>
      <div className='max-width'>{rest.children}</div>
    </div>
  );
});
