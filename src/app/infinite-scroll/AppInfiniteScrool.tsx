import { useAppRouter } from '@vagabond-inc/react-boilerplate-md';
import { ReactNode, useCallback, useRef } from 'react';
import { CommonAction } from '../../reducer/common/CommonReducer';
import { useAppDispatch } from '../../store/Store';

export interface IAppInfiniteScroolProps {
  id: string;
  className?: string;
  children?: ReactNode;
  callBack?: () => void;
}

const AppInfiniteScrool: React.FC<IAppInfiniteScroolProps> = ({ className = '', ...props }) => {
  const dispatch = useAppDispatch();
  const { location } = useAppRouter();
  const stopScroll = useRef(false);

  const handleNavigation = useCallback(
    (callBack?: () => void) => () => {
      const wrappedElement = document.getElementById(props.id);
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
    [props.id, location, dispatch],
  );

  return (
    <div
      id={props.id}
      className={'container infinite-container ' + className}
      onScroll={handleNavigation(props.callBack)}>
      <div className='max-width'>{props.children}</div>
    </div>
  );
};

AppInfiniteScrool.defaultProps = {
  callBack: () => {},
  className: '',
};

export default AppInfiniteScrool;
