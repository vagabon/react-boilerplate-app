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

const CustomShareButtons: React.FC<ICustomShareButtonsProps> = memo(({ url, hashtag = '', size = 32 }) => {
  return (
    <div className='share-buttons'>
      <EmailShareButton url={url}>
        <EmailIcon size={size} style={{ borderRadius: '5px' }} />
      </EmailShareButton>
      <FacebookShareButton url={url} hashtag={hashtag}>
        <FacebookIcon size={size} style={{ borderRadius: '5px' }} />
      </FacebookShareButton>
      <TwitterShareButton url={url} hashtags={[hashtag]}>
        <TwitterIcon size={size} style={{ borderRadius: '5px' }} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={size} style={{ borderRadius: '5px' }} />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={size} style={{ borderRadius: '5px' }} />
      </RedditShareButton>
    </div>
  );
});

export default CustomShareButtons;
