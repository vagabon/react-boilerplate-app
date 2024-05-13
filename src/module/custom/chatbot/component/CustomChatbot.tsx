import { MdFab } from '@vagabond-inc/react-boilerplate-md/dist/md/component/fab/MdFab';
import { useState } from 'react';
import { CustomChatboIframe } from './CustomChatboIframe';

export interface ICustomChatbotProps {
  iframeUrl?: string;
}

export const CustomChatbot: React.FC<ICustomChatbotProps> = ({ iframeUrl }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      {iframeUrl && (
        <>
          <MdFab
            className='chatbot-fab'
            icon='toy'
            size='small'
            color='primary'
            callback={() => setShowChatbot(!showChatbot)}
          />
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
