import { MdButton, MdFab } from '@vagabond-inc/react-boilerplate-md';
import { useState } from 'react';
import CustomChatboIframe from './CustomChatboIframe';

export interface ICustomChatbotProps {
  iframeUrl: string;
  name?: string;
}

const CustomChatbot: React.FC<ICustomChatbotProps> = ({ iframeUrl, name }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      {name ? (
        <MdButton label={name} callback={() => setShowChatbot(!showChatbot)} />
      ) : (
        <MdFab
          className='chatbot-fab'
          icon='toy'
          size='small'
          color='primary'
          callback={() => setShowChatbot(!showChatbot)}
        />
      )}
      <CustomChatboIframe showChatbot={showChatbot} iframeUrl={iframeUrl} callbackClose={() => setShowChatbot(false)} />
    </>
  );
};

export default CustomChatbot;
