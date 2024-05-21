import { MdBox } from '@vagabond-inc/react-boilerplate-md/dist/md/component/box/MdBox';
import { MdContainer } from '@vagabond-inc/react-boilerplate-md/dist/md/component/container/MdContainer';
import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { memo } from 'react';
import { IHeaderDto } from '../../dto/HeaderDto';

export interface IFooterLinkDto {
  label: string;
  url: string;
  target?: string;
}

export interface IFoorterProps extends IHeaderDto {
  isContact?: boolean;
  links: IFooterLinkDto[];
}

export const Footer: React.FC<IFoorterProps> = memo(({ isContact = true, links, ...rest }) => {
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
