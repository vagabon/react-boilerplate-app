import { MdBox, MdContainer, MdLink, MdTypo } from '@vagabond-inc/react-boilerplate-md';
import { IConfDto } from './AppTheme';

export interface IFoorterProps {
  conf: IConfDto;
  version: string;
}

const Footer: React.FC<IFoorterProps> = ({ conf, version }) => {
  return (
    <MdBox component='footer' sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <MdContainer maxWidth='lg'>
        <MdTypo variant='body2' color='secondary' align='center'>
          {'Copyright © '}
          {new Date().getFullYear()}{' '}
          <MdLink label={conf.FOOTER.WEBSITE} href={conf.FOOTER.URL} target={conf.FOOTER.TARGET} /> {' ' + version}
        </MdTypo>
      </MdContainer>
    </MdBox>
  );
};

export default Footer;
