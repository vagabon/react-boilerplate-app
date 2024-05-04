import { IApiDto, MdButton, MdMenu, useIcon } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { useChatbot } from '../hook/useChatbot';

export interface IChatbotIntegrationDto extends IApiDto {
  name: string;
  url: string;
}

export interface IAppChatbotButtonProps {
  integrations?: IChatbotIntegrationDto[];
}

const AppChatbotButton: React.FC<IAppChatbotButtonProps> = ({ integrations }) => {
  const { getIcon } = useIcon();
  const { handleClick } = useChatbot();

  const getElement = useCallback(
    (integration: IChatbotIntegrationDto, handleClose: () => void) => (
      <MdButton label={integration.name} callback={handleClick(integration.url, true, handleClose)} fullWidth />
    ),
    [handleClick],
  );

  const getIntegrations = useCallback(
    (integrations?: IChatbotIntegrationDto[]) => {
      const newIntegrations =
        integrations?.map((integration) => {
          return {
            name: integration.name,
            element: (handleClose: () => void) => getElement(integration, handleClose),
          };
        }) ?? [];
      return newIntegrations;
    },
    [getElement],
  );

  return (
    <>
      {(integrations?.length ?? 0) > 0 && (
        <MdMenu
          className='button-icon'
          variant='text'
          title={<>{getIcon('toy', 'inherit')}</>}
          elements={getIntegrations(integrations)}
        />
      )}
    </>
  );
};

export default AppChatbotButton;