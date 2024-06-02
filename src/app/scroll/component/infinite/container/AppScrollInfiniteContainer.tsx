import { PropsWithChildren, memo, useCallback, useRef } from 'react';
import { useAppDispatch } from '../../../../../store/Store';
import { CommonAction } from '../../../../../store/reducer/common/CommonReducers';
import { useLocation } from 'react-router-dom';

export interface IAppScrollInfiniteContainerProps extends PropsWithChildren {
  id: string;
  className?: string;
  callBack?: () => void;
}

export const AppScrollInfiniteContainer: React.FC<IAppScrollInfiniteContainerProps> = memo(
  ({ id, className, callBack, children }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const stopScroll = useRef(false);

    const handleScroll = useCallback(
      (callBack?: () => void) => () => {
        const wrappedElement = document.getElementById(id);
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
      [id, location, dispatch],
    );

    return (
      <div id={id} className={'container infinite-container ' + className} onScroll={handleScroll(callBack)}>
        {children}
      </div>
    );
  },
);
