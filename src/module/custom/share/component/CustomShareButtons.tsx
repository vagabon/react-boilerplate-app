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
        <EmailIcon className='border-radius5' size={buttonSize} />
      </EmailShareButton>
      <FacebookShareButton url={url} hashtag={hashtag}>
        <FacebookIcon className='border-radius5' size={buttonSize} />
      </FacebookShareButton>
      <TwitterShareButton url={url} hashtags={[hashtag ?? '']}>
        <TwitterIcon className='border-radius5' size={buttonSize} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon className='border-radius5' size={buttonSize} />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <RedditIcon className='border-radius5' size={buttonSize} />
      </RedditShareButton>
    </div>
  );
});
