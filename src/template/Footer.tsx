import { MdBox, MdContainer, MdLink, MdTypo } from '@vagabond-inc/react-boilerplate-md';
import { IConfDto } from './AppTheme';

export interface IFoorterProps {
  conf: IConfDto;
}

const Footer: React.FC<IFoorterProps> = ({ conf }) => {
  return (
    <MdBox component='footer' sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <MdContainer maxWidth='lg'>
        <MdTypo variant='body2' color='secondary' align='center'>
          {'Copyright © '}
          <MdLink label={conf.FOOTER.WEBSITE} href={conf.FOOTER.URL} target={conf.FOOTER.TARGET} color='inherit' />{' '}
          {new Date().getFullYear()}
          {'.'}
        </MdTypo>
      </MdContainer>
    </MdBox>
  );
};

export default Footer;
