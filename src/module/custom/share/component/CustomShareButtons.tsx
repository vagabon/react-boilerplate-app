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

export interface ICustomShareButtonsProps {
  url: string;
  hashtag?: string;
  size?: number;
}

export const CustomShareButtons: React.FC<ICustomShareButtonsProps> = memo(({ url, hashtag, size }) => {
  const buttonSize = size ?? 32;

  return (
    <div className='share-buttons'>
      <EmailShareButton url={url}>
        <EmailIcon size={buttonSize} style={{ borderRadius: '5px' }} />
      </EmailShareButton>
      <FacebookShareButton url={url} hashtag={hashtag}>
        <FacebookIcon size={buttonSize} style={{ borderRadius: '5px' }} />
      </FacebookShareButton>
      <TwitterShareButton url={url} hashtags={[hashtag ?? '']}>
        <TwitterIcon size={buttonSize} style={{ borderRadius: '5px' }} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={buttonSize} style={{ borderRadius: '5px' }} />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={buttonSize} style={{ borderRadius: '5px' }} />
      </RedditShareButton>
    </div>
  );
});
