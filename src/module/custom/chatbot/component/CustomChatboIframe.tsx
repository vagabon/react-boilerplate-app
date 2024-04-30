import { IconClickable } from '@vagabond-inc/react-boilerplate-md';
import { useRef, useState } from 'react';

export interface ICustomChatboIframeProps {
  showChatbot: boolean;
  iframeUrl: string;
  acceptCopy?: boolean;
  callbackClose?: () => void;
}

const CustomChatboIframe: React.FC<ICustomChatboIframeProps> = ({
  showChatbot,
  acceptCopy,
  iframeUrl,
  callbackClose,
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [lastText, setLastText] = useState('');
  const [big, setBig] = useState(false);

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
        <div className={'chatbot-modale ' + (big ? 'chatbot-modale-big' : '') + ' ' + (showChatbot ? '' : 'hidden')}>
          {callbackClose && (
            <div className='chatbot-frame-close'>
              <IconClickable icon={big ? 'reducer' : 'expand'} callback={() => setBig(!big)} />
              <IconClickable icon='close' callback={callbackClose} />
            </div>
          )}
          <iframe
            ref={ref}
            id='iframe-chatbot'
            title='chatbot'
            src={iframeUrl + '/' + localStorage.getItem('mode_theme')}
            width='100%'
            height='100%'
            onLoad={acceptCopy ? onLoad(lastText) : undefined}
            onMouseEnter={acceptCopy ? onLoad(lastText) : undefined}
            allow='clipboard-read; clipboard-write'
            aria-hidden></iframe>
        </div>
      )}
    </>
  );
};

export default CustomChatboIframe;
