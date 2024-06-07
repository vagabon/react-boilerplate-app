import { IApiDto } from '@vagabond-inc/react-boilerplate-md/dist/dto/api/ApiDto';
import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdMenuProvider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/menu/provider/MdMenuProvider';
import { useCallback } from 'react';
import { useChatbot } from '../hook/useChatbot';

export interface IChatbotIntegrationDto extends IApiDto {
  name: string;
  url: string;
}

export interface ICustomChatbotButtonProps {
  integrations?: IChatbotIntegrationDto[];
}

export const CustomChatbotButton: React.FC<ICustomChatbotButtonProps> = ({ integrations }) => {
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
        <MdMenuProvider
          className='button-icon'
          color='secondary'
          variant='text'
          title={<>{getIcon('toy', 'inherit')}</>}
          elements={getIntegrations(integrations)}
        />
      )}
    </>
  );
};
