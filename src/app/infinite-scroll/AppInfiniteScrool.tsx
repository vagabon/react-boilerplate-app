import { ReactNode, useCallback, useRef } from 'react';

export interface IAppInfiniteScroolProps {
  id: string;
  className?: string;
  children?: ReactNode;
  callBack?: () => void;
}

const AppInfiniteScrool: React.FC<IAppInfiniteScroolProps> = (props: IAppInfiniteScroolProps) => {
  const stopScroll = useRef(false);

  const handleNavigation = useCallback(
    (callBack?: () => void) => () => {
      const wrappedElement = document.getElementById(props.id);
      if (
        wrappedElement &&
        callBack &&
        wrappedElement.scrollHeight - wrappedElement.scrollTop <= wrappedElement.clientHeight + 30
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
    [props.id],
  );

  return (
    <div id={props.id} className={'flex container ' + props.className} onScroll={handleNavigation(props.callBack)}>
      <div className='flex max-width'>{props.children}</div>
    </div>
  );
};

AppInfiniteScrool.defaultProps = {
  callBack: () => {},
  className: '',
};

export default AppInfiniteScrool;
