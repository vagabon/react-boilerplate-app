import { useIcon } from '@vagabond-inc/react-boilerplate-md/dist/icon/hook/useIcon';
import { MdMenuProvider } from '@vagabond-inc/react-boilerplate-md/dist/md/component/menu/provider/MdMenuProvider';
import React, { memo, useCallback } from 'react';
import { CustomShareButtonsMenuButton } from './CustomShareButtonsMenuButton';

export interface ICustomShareButtonsMenuProps {
  url: string;
  hashtag?: string;
  size?: number;
}

export const CustomShareButtonsMenu: React.FC<ICustomShareButtonsMenuProps> = memo(({ url, hashtag, size = 32 }) => {
  const { getIcon } = useIcon();

  const getElement = useCallback(
    (type: string, handleClose: () => void) => (
      <CustomShareButtonsMenuButton
        type={type}
        url={url}
        hashtag={hashtag}
        buttonSize={size}
        handleClose={handleClose}
      />
    ),
    [url, hashtag, size],
  );

  return (
    <MdMenuProvider
      className='button-icon'
      variant='contained'
      title={<>{getIcon('share', 'inherit')}</>}
      elements={[
        {
          name: 'email',
          element: (handleClose) => getElement('email', handleClose),
        },
        {
          name: 'facebook',
          element: (handleClose) => getElement('facebook', handleClose),
        },
        {
          name: 'twitter',
          element: (handleClose) => getElement('twitter', handleClose),
        },
        {
          name: 'linkedin',
          element: (handleClose) => getElement('linkedin', handleClose),
        },
        {
          name: 'reddit',
          element: (handleClose) => getElement('reddit', handleClose),
        },
      ]}
    />
  );
});
