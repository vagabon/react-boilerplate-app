import { MdFab } from '@vagabond-inc/react-boilerplate-md/dist/md/component/fab/MdFab';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomChatboIframe } from './CustomChatboIframe';

export interface ICustomChatbotProps {
  iframeUrl?: string;
}

export const CustomChatbot: React.FC<ICustomChatbotProps> = ({ iframeUrl }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();

  const showButton = useCallback(() => {
    // TODO : put that into a props
    return !location.pathname.includes('/chatbot/model') && !location.pathname.includes('/chatbot/chat/');
  }, [location.pathname]);

  return (
    <>
      {iframeUrl && (
        <>
          {showButton() && (
            <MdFab
              className='chatbot-fab'
              icon='toy'
              size='small'
              color='secondary'
              callback={() => setShowChatbot(!showChatbot)}
            />
          )}
          <CustomChatboIframe
            showChatbot={showChatbot}
            iframeUrl={iframeUrl}
            callbackClose={() => setShowChatbot(false)}
            acceptCopy={false}
          />
        </>
      )}
    </>
  );
};
