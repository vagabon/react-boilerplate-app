import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { MdCard } from '@vagabond-inc/react-boilerplate-md/dist/md/component/card/MdCard';
import { MdChip } from '@vagabond-inc/react-boilerplate-md/dist/md/component/chip/MdChip';
import { MdLink } from '@vagabond-inc/react-boilerplate-md/dist/md/component/link/MdLink';
import { MdTypo } from '@vagabond-inc/react-boilerplate-md/dist/md/component/typo/MdTypo';
import { Translate } from '@vagabond-inc/react-boilerplate-md/dist/translate/component/Translate';
import { Trans } from 'react-i18next';
import { AppContent } from '../../../app/content/component/AppContent';
import { IHeaderDto } from '../../../template/dto/HeaderDto';

export interface IContactPageProps extends IHeaderDto {}

export const ContactPage: React.FC<IContactPageProps> = ({ ...rest }) => {
  return (
    <AppContent {...rest} className='flex1 profil-content' seo='SEO:CONTACT'>
      <section className='contact-page'>
        <MdCard icon='profile' title='CONTACT.TITLE' titleVariant='h2' className='justify-center'>
          <div className='flex-row-responsive flex1 align-start'>
            <div className='width50 align-center flex'>
              <img className='vagabond border-secondary' src='images/vagabond.png' title='vagabond' alt='vagabond' />
              <MdTypo content='CONTACT.LOGIN' component='h3' />
              <p>
                <Translate i18nKey='CONTACT.DESCRIPTION' />
                <br />
                <Trans i18nKey='CONTACT.DESCRIPTION2' />
              </p>
              <div className='flex-row flex-wrap margin-top-10 gap4'>
                <MdChip label='REACT' color='secondary' />
                <MdChip label='QUARKUS' color='secondary' />
                <MdChip label='DOCKER' color='secondary' />
                <MdChip label='GIT' color='secondary' />
              </div>
            </div>
            <div className='width50 flex gap10'>
              <div>
                <MdTypo content='CONTACT.CONTACT_ME' component='h3' />
                <MdTypo content='CONTACT.WRITE_TO_ME' />
                <a className='link-email text-primary' href={'mailto:' + rest.email}>
                  {rest.email}
                </a>
              </div>
              <div>
                <MdTypo content='CONTACT.FOLLOW_ME' component='h3' />
                <div className='flex align-start gap10'>
                  <MdButton
                    startIcon={
                      <img
                        className='button-contact'
                        src='/images/icons/discord.png'
                        title='logo discord'
                        alt='logo discord'
                        width='20px'
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
                          className='button-contact'
                          src='/images/icons/github.png'
                          title='logo GitHub'
                          alt='logo GitHub'
                          width='20px'
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
                          className='button-contact'
                          src='/images/icons/x.png'
                          title='logo GitHub'
                          alt='logo GitHub'
                          width='20px'
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
                        className='button-contact'
                        src='/images/icons/blog.png'
                        title='logo blog vagabond'
                        alt='logo blog vagabond'
                        width='20px'
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
