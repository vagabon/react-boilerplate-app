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

const CustomShareButtonsMenu: React.FC<ICustomShareButtonsMenuProps> = memo(({ url, hashtag = '', size = 32 }) => {
  const { getIcon } = useIcon();

  return (
    <MdMenu
      className='button-icon'
      variant='contained'
      title={<>{getIcon('share', 'inherit')}</>}
      elements={[
        {
          name: 'email',
          element: (
            <EmailShareButton url={url}>
              <EmailIcon size={size} style={{ borderRadius: '5px' }} />
            </EmailShareButton>
          ),
        },
        {
          name: 'facebook',
          element: (
            <FacebookShareButton url={url} hashtag={hashtag}>
              <FacebookIcon size={size} style={{ borderRadius: '5px' }} />
            </FacebookShareButton>
          ),
        },
        {
          name: 'twitter',
          element: (
            <TwitterShareButton url={url} hashtags={[hashtag]}>
              <TwitterIcon size={size} style={{ borderRadius: '5px' }} />
            </TwitterShareButton>
          ),
        },
        {
          name: 'linkedin',
          element: (
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={size} style={{ borderRadius: '5px' }} />
            </LinkedinShareButton>
          ),
        },
        {
          name: 'reddit',
          element: (
            <RedditShareButton url={url}>
              <RedditIcon size={size} style={{ borderRadius: '5px' }} />
            </RedditShareButton>
          ),
        },
      ]}
    />
  );
});

export default CustomShareButtonsMenu;
