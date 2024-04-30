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

const CustomShareButtonsMenuButton: React.FC<{
  type: string;
  url: string;
  buttonSize?: number;
  hashtag?: string;
  handleClose?: () => void;
}> = memo(({ type, url, hashtag, buttonSize, handleClose }) => {
  return (
    <>
      {type === 'email' && (
        <EmailShareButton url={url} onClick={handleClose}>
          <EmailIcon size={buttonSize} style={{ borderRadius: '5px' }} />
        </EmailShareButton>
      )}
      {type === 'facebook' && (
        <FacebookShareButton url={url} hashtag={hashtag ?? '#'} onClick={handleClose}>
          <FacebookIcon size={buttonSize} style={{ borderRadius: '5px' }} />
        </FacebookShareButton>
      )}
      {type === 'twitter' && (
        <TwitterShareButton url={url} hashtags={[hashtag ?? '#']} onClick={handleClose}>
          <TwitterIcon size={buttonSize} style={{ borderRadius: '5px' }} />
        </TwitterShareButton>
      )}
      {type === 'linkedin' && (
        <LinkedinShareButton url={url} onClick={handleClose}>
          <LinkedinIcon size={buttonSize} style={{ borderRadius: '5px' }} />
        </LinkedinShareButton>
      )}
      {type === 'reddit' && (
        <RedditShareButton url={url} onClick={handleClose}>
          <RedditIcon size={buttonSize} style={{ borderRadius: '5px' }} />
        </RedditShareButton>
      )}
    </>
  );
});

export default CustomShareButtonsMenuButton;
