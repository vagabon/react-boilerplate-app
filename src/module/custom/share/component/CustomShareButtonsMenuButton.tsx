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

export const CustomShareButtonsMenuButton: React.FC<{
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
          <EmailIcon className='border-radius5' size={buttonSize} />
        </EmailShareButton>
      )}
      {type === 'facebook' && (
        <FacebookShareButton url={url} hashtag={hashtag ?? '#'} onClick={handleClose}>
          <FacebookIcon className='border-radius5' size={buttonSize} />
        </FacebookShareButton>
      )}
      {type === 'twitter' && (
        <TwitterShareButton url={url} hashtags={[hashtag ?? '#']} onClick={handleClose}>
          <TwitterIcon className='border-radius5' size={buttonSize} />
        </TwitterShareButton>
      )}
      {type === 'linkedin' && (
        <LinkedinShareButton url={url} onClick={handleClose}>
          <LinkedinIcon className='border-radius5' size={buttonSize} />
        </LinkedinShareButton>
      )}
      {type === 'reddit' && (
        <RedditShareButton url={url} onClick={handleClose}>
          <RedditIcon className='border-radius5' size={buttonSize} />
        </RedditShareButton>
      )}
    </>
  );
});
