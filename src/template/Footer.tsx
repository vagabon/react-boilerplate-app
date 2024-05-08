import { MdBox, MdContainer, MdLink, MdTypo } from '@vagabond-inc/react-boilerplate-md';
import { memo } from 'react';
import { IHeaderProp } from './Header';

export interface IFooterLinkDto {
  label: string;
  url: string;
  target?: string;
}

export interface IFoorterProps extends IHeaderProp {
  isContact?: boolean;
  links: IFooterLinkDto[];
}

const Footer: React.FC<IFoorterProps> = memo(({ isContact = true, links, ...rest }) => {
  return (
    <MdBox id='footer' sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <MdContainer maxWidth='lg'>
        <MdTypo variant='body2' color='secondary' align='center'>
          <span className='copyright'>
            {new Date().getFullYear()} {'©' + rest.title + ' '}
          </span>
          {links?.map((link) => (
            <MdLink className='footer-link' key={link.label} label={link.label} href={link.url} target={link.target} />
          ))}
          {isContact && <MdLink href='/contact' label='Contact' />}
        </MdTypo>
      </MdContainer>
    </MdBox>
  );
});

export default Footer;
