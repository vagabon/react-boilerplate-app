import { MdFab } from '@vagabond-inc/react-boilerplate-md';
import { useState } from 'react';

export interface ICustomChatbotProps {
  iframeUrl: string;
}

const CustomChatbot: React.FC<ICustomChatbotProps> = ({ iframeUrl }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <MdFab
        className='chatbot-fab'
        icon='toy'
        size='small'
        color='primary'
        callback={() => setShowChatbot(!showChatbot)}
      />
      <div className={'chatbot-modale ' + (showChatbot ? '' : 'hidden')}>
        <iframe title='chatbot' src={iframeUrl} width='100%' height='100%'></iframe>
      </div>
    </>
  );
};

export default CustomChatbot;
