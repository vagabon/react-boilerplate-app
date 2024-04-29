import { IApiDto, MdButton, MdMenu, useIcon } from '@vagabond-inc/react-boilerplate-md';
import { useCallback, useState } from 'react';
import CustomChatboIframe from './CustomChatboIframe';

export interface IChatbotIntegrationDto extends IApiDto {
  name: string;
  url: string;
}

export interface IAppChatbotButtonProps {
  integrations: IChatbotIntegrationDto[];
}

const AppChatbotButton: React.FC<IAppChatbotButtonProps> = ({ integrations }) => {
  const { getIcon } = useIcon();

  const [showChatbot, setShowChatbot] = useState(false);
  const [iframeSelected, setIframeSelected] = useState(integrations.length > 0 ? integrations[0].url : '');

  const handleClick = useCallback(
    (url: string) => () => {
      url && setIframeSelected(url);
      setShowChatbot(url !== '');
    },
    [],
  );

  const getIntegrations = useCallback(
    (integrations: IChatbotIntegrationDto[]) => {
      const newIntegrations = integrations.map((integration) => {
        return {
          name: integration.name,
          element: <MdButton label={integration.name} callback={handleClick(integration.url)} />,
        };
      });
      return newIntegrations;
    },
    [handleClick],
  );

  return (
    <>
      {integrations.length > 0 && (
        <>
          <MdMenu
            className='button-icon'
            variant='contained'
            title={<>{getIcon('toy', 'inherit')}</>}
            elements={getIntegrations(integrations)}
          />
          {iframeSelected && (
            <CustomChatboIframe showChatbot={showChatbot} iframeUrl={iframeSelected} callbackClose={handleClick('')} />
          )}{' '}
        </>
      )}
    </>
  );
};

export default AppChatbotButton;
