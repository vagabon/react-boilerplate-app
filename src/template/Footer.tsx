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

const Footer: React.FC<IFoorterProps> = memo(({ isContact, email, links, ...rest }) => {
  return (
    <MdBox id='footer' sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <MdContainer maxWidth='lg'>
        <MdTypo variant='body2' color='secondary' align='center'>
          {new Date().getFullYear()} {'©' + rest.title + ' '}
          {links?.map((link) => (
            <MdLink className='footer-link' key={link.label} label={link.label} href={link.url} target={link.target} />
          ))}
          {isContact && (
            <a href={'mailto:' + email} style={{ fontSize: '1rem' }}>
              Contact
            </a>
          )}
        </MdTypo>
      </MdContainer>
    </MdBox>
  );
});

Footer.defaultProps = {
  isContact: true,
};

export default Footer;
