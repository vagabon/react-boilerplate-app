import { useChatbot } from '../hook/useChatbot';
import CustomChatboIframe from './CustomChatboIframe';

export interface ICustomChatbotIntegrationProps {}

const CustomChatbotIntegration: React.FC<ICustomChatbotIntegrationProps> = () => {
  const { chatbot, handleClick } = useChatbot();

  return (
    <>
      {chatbot.selected && (
        <CustomChatboIframe
          showChatbot={chatbot.show}
          iframeUrl={chatbot.selected}
          callbackClose={handleClick(chatbot.selected, false)}
          acceptCopy={true}
        />
      )}
    </>
  );
};
export default CustomChatbotIntegration;
