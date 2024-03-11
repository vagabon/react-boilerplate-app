import { MdBox, MdContainer, MdLink, MdTypo } from '@vagabond-inc/react-boilerplate-md';
import { IConfDto } from './AppTheme';

export interface IFoorterProps {
  conf: IConfDto;
  email: string;
}

const Footer: React.FC<IFoorterProps> = ({ conf, email }) => {
  return (
    <MdBox id='footer' component='footer' sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <MdContainer maxWidth='lg'>
        <MdTypo variant='body2' color='secondary' align='center'>
          {new Date().getFullYear()} {'©links4rewards '}
          {'  '}
          <MdLink label={conf.FOOTER.WEBSITE} href={conf.FOOTER.URL} target={conf.FOOTER.TARGET} />
          {'  '}
          {conf.FOOTER.CGV_URL && <MdLink label={'CGV'} href={conf.FOOTER.CGV_URL} />}
          {'  '}
          <a href={'mailto:' + email} style={{ fontSize: '1rem' }}>
            Contact
          </a>
        </MdTypo>
      </MdContainer>
    </MdBox>
  );
};

export default Footer;
