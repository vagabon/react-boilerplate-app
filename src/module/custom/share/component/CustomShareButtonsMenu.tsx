import { MdMenu, useIcon } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

export interface ICustomShareButtonsMenuProps {
  url: string;
  hashtag?: string;
  size?: number;
}

const CustomShareButtonsMenu: React.FC<ICustomShareButtonsMenuProps> = memo(({ url, hashtag, size }) => {
  const { getIcon } = useIcon();

  const buttonSize = size ?? 32;

  return (
    <MdMenu
      className='button-icon'
      variant='contained'
      title={<>{getIcon('share', 'inherit')}</>}
      elements={[
        {
          name: 'email',
          element: (handleClose) => (
            <EmailShareButton url={url} onClick={handleClose}>
              <EmailIcon size={buttonSize} style={{ borderRadius: '5px' }} />
            </EmailShareButton>
          ),
        },
        {
          name: 'facebook',
          element: (handleClose) => (
            <FacebookShareButton url={url} hashtag={hashtag ?? '#'} onClick={handleClose}>
              <FacebookIcon size={buttonSize} style={{ borderRadius: '5px' }} />
            </FacebookShareButton>
          ),
        },
        {
          name: 'twitter',
          element: (handleClose) => (
            <TwitterShareButton url={url} hashtags={[hashtag ?? '#']} onClick={handleClose}>
              <TwitterIcon size={buttonSize} style={{ borderRadius: '5px' }} />
            </TwitterShareButton>
          ),
        },
        {
          name: 'linkedin',
          element: (handleClose) => (
            <LinkedinShareButton url={url} onClick={handleClose}>
              <LinkedinIcon size={buttonSize} style={{ borderRadius: '5px' }} />
            </LinkedinShareButton>
          ),
        },
        {
          name: 'reddit',
          element: (handleClose) => (
            <RedditShareButton url={url} onClick={handleClose}>
              <RedditIcon size={buttonSize} style={{ borderRadius: '5px' }} />
            </RedditShareButton>
          ),
        },
      ]}
    />
  );
});

export default CustomShareButtonsMenu;
