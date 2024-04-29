import { IconClickable } from '@vagabond-inc/react-boilerplate-md';
import { useRef, useState } from 'react';

export interface ICustomChatboIframeProps {
  showChatbot: boolean;
  iframeUrl: string;
  callbackClose?: () => void;
}

const CustomChatboIframe: React.FC<ICustomChatboIframeProps> = ({ showChatbot, iframeUrl, callbackClose }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [lastText, setLastText] = useState('');

  const onLoad = (lastText: string) => async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text !== '' && text !== lastText) {
        setLastText(text);
        ref?.current?.contentWindow?.postMessage(JSON.stringify({ type: 'chatbot-message', message: text }), iframeUrl);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {iframeUrl && (
        <div className={'chatbot-modale ' + (showChatbot ? '' : 'hidden')}>
          {callbackClose && <IconClickable className='chatbot-frame-close' icon='close' callback={callbackClose} />}
          <iframe
            ref={ref}
            id='iframe-chatbot'
            title='chatbot'
            src={iframeUrl}
            width='100%'
            height='100%'
            onLoad={onLoad(lastText)}
            onMouseEnter={onLoad(lastText)}
            allow='clipboard-read; clipboard-write'
            aria-hidden></iframe>
        </div>
      )}
    </>
  );
};

export default CustomChatboIframe;
