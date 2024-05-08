import { MdButton, MdCard, MdChip, MdLink, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import AppContent from '../../../app/content/AppContent';
import { IHeaderProp } from '../../../template/Header';

export interface IContactPageProps extends IHeaderProp {}

const ContactPage: React.FC<IContactPageProps> = ({ ...rest }) => {
  const { Trans } = useAppTranslate();

  return (
    <AppContent {...rest} className='flex1 profil-content' seo='SEO:CONTACT'>
      <section className='contact-page'>
        <MdCard icon='profile' title='CONTACT.TITLE' titleVariant='h2' className='justify-center'>
          <div className='flex-row-responsive flex1 align-start'>
            <div className='width50 align-center flex'>
              <img className='vagabond border-secondary' src='images/vagabond.png' title='vagabond' alt='vagabond' />
              <h3>
                <Trans i18nKey='CONTACT.LOGIN' />
              </h3>
              <p>
                <Trans i18nKey='CONTACT.DESCRIPTION' />
                <br />
                <Trans i18nKey='CONTACT.DESCRIPTION2' />
              </p>
              <div className='flex-row flex-wrap margin-top gap4'>
                <MdChip label='REACT' color='secondary' />
                <MdChip label='QUARKUS' color='secondary' />
                <MdChip label='DOCKER' color='secondary' />
                <MdChip label='GIT' color='secondary' />
              </div>
            </div>
            <div className='width50 flex gap10'>
              <div>
                <h3>
                  <Trans i18nKey='CONTACT.CONTACT_ME' />
                </h3>
                <p>
                  <Trans i18nKey='CONTACT.WRITE_TO_ME' />
                </p>
                <a className='link-email text-secondary' href={'mailto:' + rest.email}>
                  {rest.email}
                </a>
              </div>
              <div>
                <h3>
                  <Trans i18nKey='CONTACT.FOLLOW_ME' />
                </h3>
                <div className='flex align-start gap10'>
                  <MdButton
                    startIcon={
                      <img
                        src='/images/icons/discord.png'
                        title='logo discord'
                        alt='logo discord'
                        width='20px'
                        style={{ margin: '-9px 0px' }}
                      />
                    }
                    url='https://discord.gg/TUy5MtVRt7'
                    label='CONTACT.DISCORD_BUTTON'
                    variant='outlined'
                    fullWidth
                  />
                  <div className='flex-row-responsive gap10 width100'>
                    <MdButton
                      startIcon={
                        <img
                          src='/images/icons/github.png'
                          title='logo GitHub'
                          alt='logo GitHub'
                          width='20px'
                          style={{ margin: '-9px 0px' }}
                        />
                      }
                      url='https://github.com/vagabon'
                      variant='outlined'
                      label='CONTACT.GITHUB_BUTTON'
                      fullWidth
                    />
                    <MdButton
                      startIcon={
                        <img
                          src='/images/icons/x.png'
                          title='logo GitHub'
                          alt='logo GitHub'
                          width='20px'
                          style={{ margin: '-9px 0px' }}
                        />
                      }
                      url='https://github.com/vagabon'
                      label='CONTACT.X_BUTTON'
                      variant='outlined'
                      fullWidth
                    />
                  </div>
                  <MdButton
                    startIcon={
                      <img
                        src='/images/icons/blog.png'
                        title='logo blog vagabond'
                        alt='logo blog vagabond'
                        width='20px'
                        style={{ margin: '-9px 0px' }}
                      />
                    }
                    url='https://blog.vagabond.synology.me'
                    label='CONTACT.BLOG_BUTTON'
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        </MdCard>
      </section>
      <section className='contact-projects'>
        <MdCard icon='blog' title='CONTACT.PROJECTS.BLOG.TITLE' titleVariant='h3' className='justify-center'>
          <div className='flex-row align-center flex1 gap10'>
            <img src='/images/icons/blog.png' title='logo blog vagabond' alt='logo blog vagabond' width='40px' />
            <p>
              <Trans i18nKey='CONTACT.PROJECTS.BLOG.DESCRIPTION' />
              <br />
              <Trans i18nKey='CONTACT.PROJECTS.BLOG.DESCRIPTION2' />
            </p>
          </div>
          <MdLink href='https://blog.vagabond.synology.me' label='https://blog.vagabond.synology.me' />
        </MdCard>
        <MdCard icon='toy' title='CONTACT.PROJECTS.OYC.TITLE' titleVariant='h3' className='justify-center'>
          <div className='flex-row align-center flex1 gap10'>
            <img src='/images/icons/oyc.png' title='logo blog vagabond' alt='logo blog vagabond' width='40px' />
            <p>
              <Trans i18nKey='CONTACT.PROJECTS.OYC.DESCRIPTION' />
              <br />
              <Trans i18nKey='CONTACT.PROJECTS.OYC.DESCRIPTION2' />
            </p>
          </div>
          <MdLink href='https://www.ownyourchatbots.com' label='https://www.ownyourchatbots.com' />
        </MdCard>
        <MdCard icon='gift' title='CONTACT.PROJECTS.L4R.TITLE' titleVariant='h3' className='justify-center'>
          <div className='flex-row align-center flex1 gap10'>
            <img src='/images/icons/ryc.png' title='logo blog vagabond' alt='logo blog vagabond' width='40px' />
            <p>
              <Trans i18nKey='CONTACT.PROJECTS.L4R.DESCRIPTION' />
            </p>
          </div>
          <MdLink href='https://www.links4rewards.fr' label='https://www.links4rewards.fr' />
        </MdCard>
      </section>
    </AppContent>
  );
};
export default ContactPage;
